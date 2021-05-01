## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

## Loading the Database

1. Edit the `clinics.csv` file, note that ages are expected to be of a format like: `18+` to be processed. Postal codes are expected to be similar to `M6K` or `M1P`.

2. Make sure there are no empty rows in the CSV and run loader: `python loader.py` from inside `./python`.

- For dev API use `http://localhost:3000` and `https://findavaccine.ca` for prod.
