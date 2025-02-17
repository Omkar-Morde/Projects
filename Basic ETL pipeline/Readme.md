# 🛠️ ETL Pipeline on Databricks

## 📝 Overview
This project demonstrates a simple **ETL pipeline** built on **Databricks Community Edition** using **PySpark**. It processes the **Iris dataset**, performs transformations, and stores the results in **Parquet format**.

---

## 🚀 Steps
1. **Extract**: Load the Iris dataset from **DBFS** (Databricks File System).
2. **Transform**: Deduplicate and aggregate the data by species.
3. **Load**: Save the transformed data to DBFS in **Parquet format**.

---

## 🛠️ Tools Used
- **PySpark** 🐍
- **Databricks Community Edition** ☁️
- **Parquet** for storage 📦

---

## 🏃‍♂️ How to Run
1. **Upload Data**:
   - Download the Iris dataset from [here](https://raw.githubusercontent.com/mwaskom/seaborn-data/master/iris.csv).
   - Upload the file to DBFS under `/FileStore/tables/iris.csv`.

2. **Run the Notebook**:
   - Import the notebook into Databricks.
   - Attach it to a cluster and run the cells.

3. **Check Output**:
   - The transformed data will be saved to `/FileStore/tables/iris_aggregated` in Parquet format.
   - Use the following code to query the results:
     ```python
     display(spark.read.parquet("/FileStore/tables/iris_aggregated"))
     ```

---

## 💻 Code Example
```python
# Step 1: Extract (Read CSV from DBFS)
df = spark.read.csv("/FileStore/tables/iris.csv", header=True, inferSchema=True)

# Step 2: Transform (Aggregate by species)
from pyspark.sql.functions import avg

transformed_df = df.groupBy("species") \
    .agg(
        avg("sepal_length").alias("avg_sepal_length"),
        avg("petal_length").alias("avg_petal_length")
    )

# Step 3: Load (Save as Parquet)
transformed_df.write.format("parquet").mode("overwrite").save("/FileStore/tables/iris_aggregated")
```
---

## 📊 Output Example

| species    |	avg_sepal_length	| avg_petal_length |
| :---:        | :---:             | :---:          |
| setosa     | 5.006             | 1.462            |
| versicolor | 5.936             | 4.260            | 
| virginica  | 6.588             | 5.552            | 

### 🎉 Done!  

You’ve successfully built and run an ETL pipeline on Databricks! 🎉
