from flask import Flask, render_template, request
import joblib
import pandas as pd

app = Flask(__name__)

try:
    # Load your pre-trained models
    scaler = joblib.load("model/scaler.pkl")
    pca = joblib.load("model/pca.pkl")
    svm_model = joblib.load("model/svm_model.pkl")
except FileNotFoundError:
    print("Error: Model files not found. Please ensure 'model/scaler.pkl', 'model/pca.pkl', and 'model/svm_model.pkl' exist.")
    exit()

@app.route("/", methods=["GET"])
def home():
    """Renders the home page."""
    return render_template("home.html")

@app.route("/predict", methods=["GET", "POST"])
def predict():
    """
    Handles file upload and prediction.
    Renders the prediction page with or without a result.
    """
    prediction_text = None
    if request.method == "POST":
        file = request.files.get("file")
        if file and file.filename.endswith(".csv"):
            try:
                # Read the CSV file into a pandas DataFrame
                df = pd.read_csv(file, header=None)

                # Validate the DataFrame shape
                if df.shape != (1, 178):
                    prediction_text = f"Error: CSV must have exactly 1 row and 178 columns, got {df.shape}"
                else:
                    # Apply scaler, PCA, and model prediction
                    scaled = scaler.transform(df)
                    pca_features = pca.transform(scaled)
                    pred = svm_model.predict(pca_features)[0]
                    prob = svm_model.predict_proba(pca_features)[0][1]

                    if pred == 1:
                        prediction_text = f"⚠️ Likely seizure. Probability: {prob:.2%}"
                    else:
                        prediction_text = f"✅ Unlikely seizure. Probability: {prob:.2%}"
            except Exception as e:
                prediction_text = f"Error processing file: {e}"
        else:
            prediction_text = "Please upload a CSV file."

    return render_template("prediction_pg.html", prediction_text=prediction_text)

if __name__ == "__main__":
    app.run(debug=True)