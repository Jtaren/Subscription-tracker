import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({ // Correct syntax for Schema arguments
    name: {
        type: String,
        required: [true, 'Subscription name is required'],
        trim: true,
        minLength: 2,
        maxLength: 100
    },
    price: {
        type: Number,
        required: [true, 'Subscription price is required'],
        min: [0, 'Price must be greater than 0']
    },
    currency: {
        type: String,
        enum: ['USD', 'EUR', 'GBP'], // Corrected: GDP should be GBP (British Pound)
        default: 'USD'
    },
    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
        required: true // Added: Frequency should probably be required
    },
    category: {
        type: String,
        enum: ['sports', 'news', 'entertainment', 'lifestyle', 'technology', 'finance', 'politics', 'other'],
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['active', 'cancelled', 'expired'],
        default: 'active'
    },
    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: (value) => value <= new Date(), // Corrected: Start date can be today or in the past.
            message: 'Start date must be today or in the past'
        }
    },
    renewalDate: {
        type: Date,
        // Removed required: Renewal date will be auto-calculated
    },
    user: {
        type: mongoose.
        Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true // Corrected: "imdex" to "index"
    }
}, { timestamps: true }); // Correct syntax for timestamps

// Auto-calculate renewal date if missing.
subscriptionSchema.pre('save', function (next) { // Correct syntax for pre middleware
    if (!this.renewalDate && this.frequency && this.startDate) { // Check if frequency and startDate exist
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        };
        
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }

    // Auto-update the status if renewal date has passed
    if (this.renewalDate && this.renewalDate < new Date()) { // Check if renewalDate exists
        this.status = 'expired';
    }

    next();
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;