# Big Data Technologies -- Note 1

*(Based on Note 1: Introduction -- What is Big Data & Hadoop? A peek
into HDFS)*

## 1. What is Big Data?

Big Data refers to datasets that are so large or complex that
traditional data processing systems cannot efficiently store, manage, or
analyze them.


## 2. Why is Big Data important?

Big Data helps discover patterns, trends, correlations, and insights
that improve decision-making, scientific research, and business
strategies.


## 3. What are the main sources of Big Data?

Common sources include: - Social media platforms - Web logs - Financial
systems - Scientific research data - Sensors and IoT devices


## 4. What are the three types of data?

### Structured Data

Organized data with a predefined schema (e.g., relational databases).

### Semi-structured Data

Data with partial structure such as JSON, XML, and emails.

### Unstructured Data

Data without predefined structure such as images, videos, tweets, and
web logs.


## 5. What are the 4 V's of Big Data?

-   **Volume** -- Massive amount of data.
-   **Velocity** -- Speed at which data is generated.
-   **Variety** -- Different types and formats of data.
-   **Veracity** -- Reliability and quality of data.


## 6. What are the major challenges of Big Data?

-   Storing massive datasets
-   Processing large-scale data
-   Handling unstructured data
-   Scaling systems efficiently
-   Managing failures in distributed systems


## 7. What are the key principles behind Hadoop design?

1.  Scale out instead of scale up.
2.  Assume failures are common.
3.  Move computation to the data.
4.  Hide system complexity from developers.
5.  Process data sequentially.
6.  Seamless scalability.


## 8. What is Hadoop?

Hadoop is a framework that allows distributed storage and processing of
large datasets across clusters of commodity hardware using the MapReduce
programming model.


## 9. What are the core components of Hadoop?

1.  **HDFS (Hadoop Distributed File System)** -- Distributed storage
    system.
2.  **MapReduce** -- Distributed data processing framework.


## 10. What is a Hadoop Cluster?

A Hadoop cluster is a collection of machines (nodes) working together to
store and process data using HDFS and MapReduce.


## 11. What is HDFS?

HDFS is a distributed file system designed to store very large files
across clusters of commodity hardware.

Key characteristics: - Very large files - Streaming data access - Fault
tolerance - Commodity hardware - Write-once-read-many model


## 12. What architecture does HDFS use?

HDFS follows a **Master--Slave architecture**.

-   **NameNode** -- Master node managing metadata.
-   **DataNodes** -- Worker nodes storing actual data blocks.


## 13. What does the NameNode do?

The NameNode manages filesystem metadata including: - Directory
structure - File-to-block mapping - Block locations - Permissions


## 14. What do DataNodes do?

DataNodes store actual data blocks and handle read/write requests from
clients.


## 15. What is an HDFS block?

Files stored in HDFS are divided into blocks which are distributed
across different nodes in the cluster.


## 16. What is the default HDFS block size?

Default block size is **128 MB** (64 MB in older Hadoop versions).


## 17. Why are HDFS blocks large?

Large block sizes reduce disk seek operations and increase throughput
when processing large datasets.


## 18. What is the default replication factor?

Default replication factor is **3**.


## 19. Why does HDFS replicate data?

Replication provides **fault tolerance and data availability** when
nodes fail.


## 20. What is Rack Awareness?

Rack Awareness ensures that replicas of data blocks are placed on
different racks to improve fault tolerance and network performance.


## 21. What is the HDFS replica placement policy?

When replication factor is 3: 1. One replica on the same node writing
the data. 2. One replica on a different node in the same rack. 3. One
replica on a node in another rack.


## 22. When does re-replication happen?

Re-replication occurs when: - A DataNode fails - A replica becomes
corrupted - A disk fails - Replication factor is increased


## 23. What is the HDFS Balancer?

HDFS Balancer redistributes blocks across DataNodes to maintain balanced
storage utilization.


## 24. What workloads is HDFS good for?

-   Very large files
-   Streaming data access
-   Write-once-read-many workloads
-   Distributed processing


## 25. What are the limitations of HDFS?

HDFS is not suitable for: - Low-latency access - Many small files -
Multiple writers - Random file modifications


## 26. What advantages does Hadoop provide?

-   Distributed storage
-   Parallel processing
-   Fault tolerance
-   Scalability to thousands of nodes
-   Ability to process petabytes of data



# Key Exam Questions

1. What is Big Data?
2. What are the 4 V’s of Big Data?
3. What are the core components of Hadoop?
4. What is HDFS?
5. What is the default block size in HDFS?
6. What is the default replication factor?
7. What is Hadoop cluster?
8. Explain HDFS architecture.
9. What is Rack Awareness?
10. What are the limitations of HDFS?
