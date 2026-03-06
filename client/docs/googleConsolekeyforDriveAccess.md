# Step 8 — Google Service Account Setup

To allow the backend to access Google Drive, you must create **Google Service Account credentials**.

---

## 1. Open Google Cloud Console

Go to:

https://console.cloud.google.com

---

## 2. Create a New Project

1. Click **Select Project** at the top
2. Click **New Project**
3. Enter project name  
   Example: `exam-platform`
4. Click **Create**

---

## 3. Enable Google Drive API

1. Open **APIs & Services**
2. Click **Library**
3. Search for **Google Drive API**
4. Click **Enable**

---

## 4. Create a Service Account

1. Go to **APIs & Services**
2. Click **Credentials**
3. Click **Create Credentials**
4. Select **Service Account**
5. Enter a name  
   Example: `drive-access-service`
6. Click **Create and Continue**

You can skip role selection if not needed.

---

## 5. Generate Service Account Key

1. Open the created **Service Account**
2. Go to the **Keys** tab
3. Click **Add Key**
4. Select **Create New Key**
5. Choose **JSON**
6. Click **Create**

A **JSON credentials file** will download automatically.

---

## 6. Store the JSON Key

Place the downloaded file in your backend project.

Example:
