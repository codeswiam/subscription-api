import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Subscription name is required"],
    trim: true,
    minLength: [2, "Name must be at least 2 characters"],
    maxLength: [100, "Name must not be more than 30 characters"],
  }, 
  price: {
    type: Number,
    required: [true, "Subscription price is required"],
    min: [0, "Price must be a positive number"],
  },
  currency: {
    type: String,
    enum: ["USD", "EUR", "GBP"],
    default: "USD",
  },
  frequency: { // how many times the subscription is billed
    type: String,
    enum: ["daily", "weekly", "monthly", "yearly"],
    default: "monthly",
  }, 
  category: {
    type: String,
    enum: ["streaming", "food", "transport", "entertainment", "other"],
    required: [true, "Subscription category is required"],
  },
  paymentMethod: {
    type: String,
    enum: ["credit card", "debit card", "paypal", "other"],
    required: [true, "Payment method is required"],
  }, 
  status : {
    type: String,
    enum: ["active", "cancelled", "expired"],
    default: "active",
  },
  startDate: {
    type: Date,
    required: [true, "Start date is required"],
    validate: {
      validator: function(v) {
        return v <= new Date();
      },
      message: "Start date must be before or today",
    },
  },
  renewalDate: {
    type: Date,
    validate: {
      validator: function(v) {
        return v > this.startDate;
      },
      message: "Renewal date must be after the start date",
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    index: true,
  }
}, {timestamps: true});

// function to be called before saving a subscription
// will calculate the renewal date if missing
subscriptionSchema.pre('save', function(next){
    if (!this.renewalDate) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        }

        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }

    // auto-update the status if renewal date has passed
    if (this.renewalDate < new Date()) {
        this.status = "expired";
    }

    next();
})

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;