"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const financial_records_1 = __importDefault(require("./routes/financial-records"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
app.use(express_1.default.json());
const corsOptions = {
  origin: 'https://finance-tracker-client-dun.vercel.app', // without trailing slash
  methods: 'GET,POST,PUT,DELETE', // HTTP methods allowed
  credentials: true // Allow credentials (cookies, etc.)
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Handle preflight requests

const mongoURI = process.env.MONGO_URI || ""; // use the environment variable
if (!mongoURI) {
    console.error("Mongo URI is not defined in the environment file.");
    process.exit(1); // exit the application if the URI is missing
}
mongoose_1.default.connect(mongoURI)
    .then(() => console.log("CONNECTED TO MONGODB!"))
    .catch((err) => console.error("Failed to connect to MongoDB:", err));
app.use("/financial-records", financial_records_1.default);
app.listen(port, () => {
    console.log(`Server Running on Port ${port}`);
});
