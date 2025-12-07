import {
    Chart as ChartJS,
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Pie, Line } from 'react-chartjs-2';
import '../styles/Dashboard.css'; // Reuse dashboard styles for now

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const ExpenseCharts = ({ expenses }) => {
    if (!expenses || expenses.length === 0) return null;

    // 1. Prepare Data for Pie Chart (Category Breakdown)
    const categoryTotals = expenses.reduce((acc, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
        return acc;
    }, {});

    const pieData = {
        labels: Object.keys(categoryTotals),
        datasets: [
            {
                data: Object.values(categoryTotals),
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                    '#C9CBCF',
                ],
                borderWidth: 1,
            },
        ],
    };

    // 2. Prepare Data for Line Chart (Spending Trend)
    // Sort expenses by date
    const sortedExpenses = [...expenses].sort((a, b) => new Date(a.date) - new Date(b.date));

    // Group by date
    const dateTotals = sortedExpenses.reduce((acc, curr) => {
        const date = curr.date;
        acc[date] = (acc[date] || 0) + curr.amount;
        return acc;
    }, {});

    const lineData = {
        labels: Object.keys(dateTotals),
        datasets: [
            {
                label: 'Daily Spending',
                data: Object.values(dateTotals),
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
                fill: false,
            },
        ],
    };

    return (
        <div className="charts-container">
            <div className="chart-card">
                <h3>Spending by Category</h3>
                <div className="chart-wrapper">
                    <Pie data={pieData} />
                </div>
            </div>
            <div className="chart-card">
                <h3>Spending Trend</h3>
                <div className="chart-wrapper">
                    <Line data={lineData} />
                </div>
            </div>
        </div>
    );
};

export default ExpenseCharts;
