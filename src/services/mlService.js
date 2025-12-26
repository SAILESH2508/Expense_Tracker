import * as tf from '@tensorflow/tfjs';

// Simple keyword-based training data for the "smart" categorization
// In a real app, this would be trained on user's actual history
const TRAINING_DATA = [
    { text: 'coffee', category: 'Food' },
    { text: 'starbucks', category: 'Food' },
    { text: 'lunch', category: 'Food' },
    { text: 'dinner', category: 'Food' },
    { text: 'burger', category: 'Food' },
    { text: 'pizza', category: 'Food' },
    { text: 'uber', category: 'Transport' },
    { text: 'taxi', category: 'Transport' },
    { text: 'bus', category: 'Transport' },
    { text: 'train', category: 'Transport' },
    { text: 'gas', category: 'Transport' },
    { text: 'fuel', category: 'Transport' },
    { text: 'netflix', category: 'Entertainment' },
    { text: 'movie', category: 'Entertainment' },
    { text: 'cinema', category: 'Entertainment' },
    { text: 'spotify', category: 'Entertainment' },
    { text: 'game', category: 'Entertainment' },
    { text: 'grocery', category: 'Food' },
    { text: 'supermarket', category: 'Food' },
    { text: 'walmart', category: 'Food' },
    { text: 'bill', category: 'Bills' },
    { text: 'electricity', category: 'Bills' },
    { text: 'water', category: 'Bills' },
    { text: 'rent', category: 'Bills' },
    { text: 'internet', category: 'Bills' },
    { text: 'phone', category: 'Bills' },
    { text: 'doctor', category: 'Healthcare' },
    { text: 'medicine', category: 'Healthcare' },
    { text: 'pharmacy', category: 'Healthcare' },
    { text: 'hospital', category: 'Healthcare' },
    { text: 'shirt', category: 'Shopping' },
    { text: 'shoes', category: 'Shopping' },
    { text: 'clothes', category: 'Shopping' },
    { text: 'amazon', category: 'Shopping' },
];

// Map categories to indices
const CATEGORIES = ['Food', 'Transport', 'Bills', 'Shopping', 'Entertainment', 'Healthcare', 'Others'];



export const predictCategory = async (description) => {
    if (!description) return null;

    const lowerDesc = description.toLowerCase();

    // 1. Try exact keyword matching first (fastest)
    const exactMatch = TRAINING_DATA.find(item => lowerDesc.includes(item.text));
    if (exactMatch) {
        return exactMatch.category;
    }

    // 2. Fallback: Return 'Others' if no keyword match
    // For a full TF.js implementation, we would load a Universal Sentence Encoder
    // but that's too heavy for this demo. We'll stick to the keyword heuristic 
    // which acts as our "model" for now, as it's instant and requires no heavy model download.
    return 'Others';
};

export const predictSpending = async (expenses) => {
    if (!expenses || expenses.length < 5) return null;

    // Prepare data for time series forecasting
    // Group by day and sum amounts
    const dailyExpenses = {};
    expenses.forEach(exp => {
        // Assuming date is in a parseable format or we use timestamp
        const date = new Date(exp.date).getTime();
        if (!isNaN(date)) {
            // Normalize to day
            const dayKey = Math.floor(date / (1000 * 60 * 60 * 24));
            dailyExpenses[dayKey] = (dailyExpenses[dayKey] || 0) + exp.amount;
        }
    });

    const xValues = Object.keys(dailyExpenses).map(k => parseInt(k)).sort((a, b) => a - b);
    const yValues = xValues.map(k => dailyExpenses[k]);

    if (xValues.length < 2) return null;

    // Create a simple linear regression model using TF.js
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
    model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });

    const xs = tf.tensor2d(xValues, [xValues.length, 1]);
    const ys = tf.tensor2d(yValues, [yValues.length, 1]);

    // Train the model
    await model.fit(xs, ys, { epochs: 50 });

    // Predict next 30 days
    const lastDay = xValues[xValues.length - 1];
    const futureDays = Array.from({ length: 30 }, (_, i) => lastDay + i + 1);
    const predictXs = tf.tensor2d(futureDays, [futureDays.length, 1]);

    const prediction = model.predict(predictXs);
    const predictedValues = await prediction.data();

    // Cleanup tensors
    xs.dispose();
    ys.dispose();
    predictXs.dispose();
    prediction.dispose();
    model.dispose();

    const totalPredicted = predictedValues.reduce((a, b) => a + b, 0);
    return Math.max(0, totalPredicted); // Ensure non-negative
};

export const detectAnomalies = (expenses) => {
    if (!expenses || expenses.length < 5) return [];

    const amounts = expenses.map(e => e.amount);
    const mean = amounts.reduce((a, b) => a + b, 0) / amounts.length;
    const stdDev = Math.sqrt(amounts.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b, 0) / amounts.length);

    // Flag expenses that are more than 2 standard deviations from the mean
    // and are "high" (above mean)
    const threshold = mean + (2 * stdDev);

    return expenses.filter(e => e.amount > threshold);
};

export const recommendBudget = (expenses) => {
    if (!expenses || expenses.length < 5) return null;

    // Calculate average monthly spending
    // For simplicity in this demo, we'll just take the total and divide by unique months
    // In a real app, you'd want more robust time handling
    const months = new Set(expenses.map(e => {
        const d = new Date(e.date);
        return `${d.getFullYear()}-${d.getMonth()}`;
    })).size || 1;

    const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
    const avgMonthly = totalSpent / months;

    // Recommend 10% buffer or savings on top of average
    // Or if they are overspending, maybe suggest cutting back?
    // Let's suggest a budget that is slightly higher than average to be safe, 
    // but maybe round it to nearest 100
    return Math.ceil((avgMonthly * 1.1) / 100) * 100;
};
