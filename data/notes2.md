# Big Data Technologies -- Note 2

## HDFS in Depth & YARN

This README summarizes the most important exam concepts from **Note 2
2: HDFS in Depth & YARN**.


# 1. Hadoop 1.x Daemons

## What is a daemon?

A daemon is a background service process running continuously on a
system.

## Hadoop 1.x daemons

1.  NameNode -- manages filesystem metadata
2.  Secondary NameNode -- performs checkpointing
3.  DataNode -- stores actual data blocks
4.  JobTracker -- manages MapReduce jobs
5.  TaskTracker -- executes map and reduce tasks

Each daemon runs in its own JVM.


# 2. NameNode

## What is the NameNode?

The NameNode is the master node of HDFS responsible for managing
metadata and filesystem namespace.

## What does NameNode store?

-   file names
-   directory structure
-   file permissions
-   block mapping
-   replication factor
-   block locations

Important: NameNode does NOT store actual data.

## Why is NameNode a single point of failure?

If the NameNode crashes, the entire HDFS cluster becomes unusable.


# 3. DataNode

## What is a DataNode?

DataNodes are worker nodes responsible for storing actual HDFS data
blocks.

## What does DataNode send to NameNode?

1.  Heartbeat (every 3 seconds)
2.  BlockReport (every 10 heartbeats)

These messages inform NameNode about node health and stored blocks.


# 4. HDFS File Read Operation

Steps: 1. Client contacts NameNode 2. NameNode returns block locations
3. Client connects directly to DataNodes 4. Data is streamed from
DataNodes to client

Important: Data never flows through the NameNode.


# 5. HDFS File Write Operation

Steps: 1. Client contacts NameNode 2. NameNode checks permissions 3.
NameNode allocates blocks 4. Client writes data to DataNode 5. DataNodes
replicate blocks

Default replication factor = 3.


# 6. HDFS Metadata Files

## FsImage

Snapshot of filesystem metadata.

## Edits Log

Records filesystem modifications.

Purpose: Recovery after NameNode failure.


# 7. Checkpointing

Checkpointing merges:

FsImage + EditsLog → New FsImage

Purpose: - reduce edits log size - reduce NameNode restart time


# 8. Secondary NameNode

Role: - merges FsImage and Edits Log periodically - performs
checkpointing

Important exam point:

Secondary NameNode is NOT a backup NameNode.

If NameNode fails, Secondary NameNode does NOT automatically replace it.


# 9. Safe Mode

When NameNode starts:

-   system enters Safe Mode
-   filesystem becomes read-only
-   DataNodes send block reports
-   NameNode verifies block replication

After verification, Safe Mode exits.


# 10. Hadoop 1.x Limitations

1.  NameNode single point of failure
2.  JobTracker single point of failure
3.  Only MapReduce supported
4.  Limited scalability (\~4000 nodes)
5.  Static resource slots

Result: Hadoop 1.x was a single-purpose batch system.


# 11. Hadoop 2 Improvements

Hadoop 2 introduced:

-   YARN
-   NameNode High Availability
-   HDFS Federation
-   Containers instead of slots
-   Better scalability (\>10,000 nodes)


# 12. HDFS Federation

HDFS Federation allows:

-   multiple NameNodes
-   multiple namespaces
-   shared DataNodes

Benefit: - improves scalability - isolates workloads


# 13. NameNode High Availability

Problem solved: NameNode Single Point of Failure.

Solution: Two NameNodes: - Active NameNode - Standby NameNode

If active fails → standby becomes active.


# 14. What is YARN?

YARN (Yet Another Resource Negotiator) is Hadoop's cluster resource
management system.

It separates:

-   resource management
-   job scheduling
-   data processing


# 15. YARN Architecture

Main components:

1.  Resource Manager
2.  Node Manager
3.  Application Master
4.  Containers


# 16. Resource Manager

Responsibilities:

-   global resource scheduling
-   cluster resource management
-   container allocation

Only one Resource Manager per cluster.


# 17. Node Manager

Runs on each worker node.

Responsibilities:

-   launch containers
-   monitor tasks
-   report resource usage


# 18. Containers

Container = resource allocation unit.

Example resources: - CPU cores - RAM - Disk - Network

Containers run application tasks.


# 19. Application Master

One per application.

Responsibilities:

-   request containers
-   coordinate tasks
-   monitor application execution


# 20. YARN Application Execution Flow

1.  Client submits job
2.  ResourceManager launches ApplicationMaster
3.  ApplicationMaster requests containers
4.  NodeManagers launch tasks
5.  Tasks run and report status
6.  ApplicationMaster exits after completion


# 21. Hadoop Admin Commands

Start Hadoop:

start-all.sh

Stop Hadoop:

stop-all.sh

Start DFS:

start-dfs.sh

Start YARN:

start-yarn.sh


# 22. Basic HDFS Commands

Create directory:

hadoop fs -mkdir dir

List files:

hadoop fs -ls

Upload file:

hadoop fs -put file.txt /path

Download file:

hadoop fs -get file.txt

Delete file:

hadoop fs -rm file.txt


# Key Exam Questions

1.  Explain NameNode responsibilities.
2.  What are FsImage and EditsLog?
3.  What is checkpointing?
4.  Why is Secondary NameNode not a backup?
5.  Explain Safe Mode in HDFS.
6.  What are Hadoop 1.x limitations?
7.  What is HDFS Federation?
8.  Explain NameNode High Availability.
9.  What is YARN?
10. What are YARN components?
11. Difference between Hadoop 1 and Hadoop 2.
