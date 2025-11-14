# Code Citations

## License: unknown
https://github.com/giraff/qallah-mini/tree/7bb022e441aecec539e87e909354050a904ae9e9/server/package.json.save

```
^0.21.1",
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^8.6.0",
    "express": "^4.
```

backend/
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── jobController.js
│   │   ├── paymentController.js
│   │   └── webhookController.js
│   ├── middlewares/
│   │   ├── auth.js
│   │   └── verifyHmac.js
│   ├── models/
│   │   ├── Job.js
│   │   ├── Invoice.js
│   │   ├── Ledger.js
│   │   ├── User.js
│   │   ├── WalletMapping.js
│   │   └── ConversionTransaction.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── jobs.js
│   │   ├── payments.js
│   │   └── webhooks.js
│   ├── services/
│   │   ├── bitnobService.js
│   │   └── payoutService.js
│   ├── utils/
│   │   ├── auditLogger.js
│   │   └── jwt.js
│   └── index.js
├── tests/
│   └── sample.test.js
├── .env.example
├── jest.config.js
├── tsconfig.json
└── README.md

