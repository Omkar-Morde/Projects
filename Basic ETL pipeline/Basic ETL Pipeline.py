# Databricks notebook source
# Step 1: Extract (Read CSV from DBFS)
df = spark.read.csv("/FileStore/tables/iris.csv", header=True, inferSchema=True)

# COMMAND ----------

# Step 2: Transform (Aggregate by species)
from pyspark.sql.functions import avg

transformed_df = df.groupBy("species") \
    .agg(
        avg("sepal_length").alias("avg_sepal_length"),
        avg("petal_length").alias("avg_petal_length")
    )

# COMMAND ----------

# Step 3: Load (Save as Parquet)
transformed_df.write.format("parquet").mode("overwrite").save("/FileStore/tables/iris_aggregated")

# COMMAND ----------

# Step 4: Query Results
display(spark.read.parquet("/FileStore/tables/iris_aggregated"))
