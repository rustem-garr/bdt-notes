let questions = [];
let currentIndex = 0;
let currentNote = 1;

// Embedded questions data
const questionsData = `NOTE 1: Introduction -- What is Big Data & Hadoop? A peek into HDFS

Q: What is Big Data?
A: Big Data refers to datasets that are so large or complex that traditional data processing systems cannot efficiently store, manage, or analyze them.

Q: Why is Big Data important?
A: Big Data helps discover patterns, trends, correlations, and insights that improve decision-making, scientific research, and business strategies.

Q: What are the main sources of Big Data?
A: Common sources include: Social media platforms, Web logs, Financial systems, Scientific research data, Sensors and IoT devices

Q: What are the three types of data?
A: 1. Structured Data - Organized data with a predefined schema (e.g., relational databases). 2. Semi-structured Data - Data with partial structure such as JSON, XML, and emails. 3. Unstructured Data - Data without predefined structure such as images, videos, tweets, and web logs.

Q: What are the 4 V's of Big Data?
A: 1. Volume - Massive amount of data. 2. Velocity - Speed at which data is generated. 3. Variety - Different types and formats of data. 4. Veracity - Reliability and quality of data.

Q: What are the major challenges of Big Data?
A: Storing massive datasets, Processing large-scale data, Handling unstructured data, Scaling systems efficiently, Managing failures in distributed systems

Q: What are the key principles behind Hadoop design?
A: 1. Scale out instead of scale up. 2. Assume failures are common. 3. Move computation to the data. 4. Hide system complexity from developers. 5. Process data sequentially. 6. Seamless scalability.

Q: What is Hadoop?
A: Hadoop is a framework that allows distributed storage and processing of large datasets across clusters of commodity hardware using the MapReduce programming model.

Q: What are the core components of Hadoop?
A: 1. HDFS (Hadoop Distributed File System) - Distributed storage system. 2. MapReduce - Distributed data processing framework.

Q: What is a Hadoop Cluster?
A: A Hadoop cluster is a collection of machines (nodes) working together to store and process data using HDFS and MapReduce.

Q: What is HDFS?
A: HDFS is a distributed file system designed to store very large files across clusters of commodity hardware. Key characteristics: Very large files, Streaming data access, Fault tolerance, Commodity hardware, Write-once-read-many model

Q: What architecture does HDFS use?
A: HDFS follows a Master-Slave architecture. NameNode - Master node managing metadata. DataNodes - Worker nodes storing actual data blocks.

Q: What does the NameNode do?
A: The NameNode manages filesystem metadata including: Directory structure, File-to-block mapping, Block locations, Permissions

Q: What do DataNodes do?
A: DataNodes store actual data blocks and handle read/write requests from clients.

Q: What is an HDFS block?
A: Files stored in HDFS are divided into blocks which are distributed across different nodes in the cluster.

Q: What is the default HDFS block size?
A: Default block size is 128 MB (64 MB in older Hadoop versions).

Q: Why are HDFS blocks large?
A: Large block sizes reduce disk seek operations and increase throughput when processing large datasets.

Q: What is the default replication factor?
A: Default replication factor is 3.

Q: Why does HDFS replicate data?
A: Replication provides fault tolerance and data availability when nodes fail.

Q: What is Rack Awareness?
A: Rack Awareness ensures that replicas of data blocks are placed on different racks to improve fault tolerance and network performance.

Q: What is the HDFS replica placement policy?
A: When replication factor is 3: 1. One replica on the same node writing the data. 2. One replica on a different node in the same rack. 3. One replica on a node in another rack.

Q: When does re-replication happen?
A: Re-replication occurs when: A DataNode fails, A replica becomes corrupted, A disk fails, Replication factor is increased

Q: What is the HDFS Balancer?
A: HDFS Balancer redistributes blocks across DataNodes to maintain balanced storage utilization.

Q: What workloads is HDFS good for?
A: Very large files, Streaming data access, Write-once-read-many workloads, Distributed processing

Q: What are the limitations of HDFS?
A: HDFS is not suitable for: Low-latency access, Many small files, Multiple writers, Random file modifications

Q: What advantages does Hadoop provide?
A: Distributed storage, Parallel processing, Fault tolerance, Scalability to thousands of nodes, Ability to process petabytes of data

---

NOTE 2: HDFS in Depth & YARN

Q: What is a daemon?
A: A daemon is a background service process running continuously on a system.

Q: What are Hadoop 1.x daemons?
A: 1. NameNode - manages filesystem metadata. 2. Secondary NameNode - performs checkpointing. 3. DataNode - stores actual data blocks. 4. JobTracker - manages MapReduce jobs. 5. TaskTracker - executes map and reduce tasks. Each daemon runs in its own JVM.

Q: What is the NameNode?
A: The NameNode is the master node of HDFS responsible for managing metadata and filesystem namespace.

Q: What does NameNode store?
A: File names, directory structure, file permissions, block mapping, replication factor, block locations. Important: NameNode does NOT store actual data.

Q: Why is NameNode a single point of failure?
A: If the NameNode crashes, the entire HDFS cluster becomes unusable.

Q: What is a DataNode?
A: DataNodes are worker nodes responsible for storing actual HDFS data blocks.

Q: What does DataNode send to NameNode?
A: 1. Heartbeat (every 3 seconds). 2. BlockReport (every 10 heartbeats). These messages inform NameNode about node health and stored blocks.

Q: Explain the HDFS File Read Operation?
A: 1. Client contacts NameNode. 2. NameNode returns block locations. 3. Client connects directly to DataNodes. 4. Data is streamed from DataNodes to client. Important: Data never flows through the NameNode.

Q: Explain the HDFS File Write Operation?
A: 1. Client contacts NameNode. 2. NameNode checks permissions. 3. NameNode allocates blocks. 4. Client writes data to DataNode. 5. DataNodes replicate blocks. Default replication factor = 3.

Q: What are HDFS Metadata Files?
A: FsImage - Snapshot of filesystem metadata. Edits Log - Records filesystem modifications. Purpose: Recovery after NameNode failure.

Q: What is Checkpointing?
A: Checkpointing merges FsImage + EditsLog → New FsImage. Purpose: reduce edits log size, reduce NameNode restart time

Q: What is the Secondary NameNode?
A: Role: merges FsImage and Edits Log periodically, performs checkpointing. Important exam point: Secondary NameNode is NOT a backup NameNode. If NameNode fails, Secondary NameNode does NOT automatically replace it.

Q: What is Safe Mode?
A: When NameNode starts: system enters Safe Mode, filesystem becomes read-only, DataNodes send block reports, NameNode verifies block replication. After verification, Safe Mode exits.

Q: What are Hadoop 1.x Limitations?
A: 1. NameNode single point of failure. 2. JobTracker single point of failure. 3. Only MapReduce supported. 4. Limited scalability (~4000 nodes). 5. Static resource slots. Result: Hadoop 1.x was a single-purpose batch system.

Q: What are Hadoop 2 Improvements?
A: Hadoop 2 introduced: YARN, NameNode High Availability, HDFS Federation, Containers instead of slots, Better scalability (>10,000 nodes)

Q: What is HDFS Federation?
A: HDFS Federation allows: multiple NameNodes, multiple namespaces, shared DataNodes. Benefit: improves scalability, isolates workloads

Q: What is NameNode High Availability?
A: Problem solved: NameNode Single Point of Failure. Solution: Two NameNodes: Active NameNode and Standby NameNode. If active fails → standby becomes active.

Q: What is YARN?
A: YARN (Yet Another Resource Negotiator) is Hadoop's cluster resource management system. It separates: resource management, job scheduling, data processing

Q: What is the YARN Architecture?
A: Main components: 1. Resource Manager. 2. Node Manager. 3. Application Master. 4. Containers

Q: What are the responsibilities of Resource Manager?
A: Global resource scheduling, Cluster resource management, Container allocation. Only one Resource Manager per cluster.

Q: What are the responsibilities of Node Manager?
A: Launch containers, Monitor tasks, Report resource usage. Runs on each worker node.

Q: What are Containers?
A: Container = resource allocation unit. Example resources: CPU cores, RAM, Disk, Network. Containers run application tasks.

Q: What is an Application Master?
A: One per application. Responsibilities: request containers, coordinate tasks, monitor application execution

Q: Explain the YARN Application Execution Flow?
A: 1. Client submits job. 2. ResourceManager launches ApplicationMaster. 3. ApplicationMaster requests containers. 4. NodeManagers launch tasks. 5. Tasks run and report status. 6. ApplicationMaster exits after completion.

Q: What are Hadoop Admin Commands?
A: Start Hadoop: start-all.sh. Stop Hadoop: stop-all.sh. Start DFS: start-dfs.sh. Start YARN: start-yarn.sh

Q: What are basic HDFS Commands?
A: Create directory: hadoop fs -mkdir dir. List files: hadoop fs -ls. Upload file: hadoop fs -put file.txt /path. Download file: hadoop fs -get file.txt. Delete file: hadoop fs -rm file.txt

---

NOTE 3: MapReduce Paradigm

Q: What is MapReduce?
A: MapReduce is a massively scalable parallel processing framework used to process big data stored in HDFS.

Q: Why is MapReduce important?
A: It hides system-level complexity such as synchronization, inter-process communication, data distribution, and machine failures from the programmer.

Q: What is the main idea behind solving large data problems?
A: The main approach is divide and conquer: break a large problem into smaller tasks, process tasks in parallel, combine partial results

Q: What problems does MapReduce solve for programmers?
A: MapReduce automatically handles: task assignment, data distribution, synchronization, fault tolerance, parallel execution across many machines

Q: Where does the name MapReduce come from?
A: The terms map and reduce come from functional programming. map applies a function to each element in a collection. reduce aggregates multiple values into one result

Q: What is map in MapReduce?
A: Map is a transformation phase that processes input key-value pairs and emits intermediate key-value pairs.

Q: What is reduce in MapReduce?
A: Reduce is an aggregation phase that processes all values belonging to the same key and emits final output key-value pairs.

Q: What is the basic data structure in MapReduce?
A: The basic data structure in MapReduce is the key-value pair. Important: no value exists without a key, both map input/output and reduce input/output are key-value pairs

Q: What are the signatures of map and reduce?
A: Map: map : (k1, v1) -> list(k2, v2). Reduce: reduce : (k2, list(v2)) -> list(k3, v3)

Q: Why is map easily parallelizable?
A: Each mapper works independently on a different input split, so map tasks can run in parallel without needing communication among them.

Q: Why does reduce require data movement?
A: Reduce requires all values for the same key to be brought together from different mappers, which causes network transfer during shuffle.

Q: What is the implicit operation between map and reduce?
A: The framework automatically performs a distributed group by on intermediate keys between map and reduce.

Q: What happens between map and reduce?
A: The framework performs: shuffle, sort, group by key. This phase is automatic.

Q: What is shuffle?
A: Shuffle is the process of transferring mapper output across the network and grouping all values with the same key for reducers.

Q: What is sorted in MapReduce?
A: Intermediate data is sorted by key, not by value. Reducers receive keys in sorted order.

Q: Is MapReduce output globally sorted?
A: Not always. With one reducer, output is globally sorted by key. With multiple reducers, each output file is sorted internally, but global ordering across files is not guaranteed.

Q: What are the phases of a MapReduce job?
A: A MapReduce job executes in six phases: 1. Input phase. 2. Split phase. 3. Map phase. 4. Shuffle/Sort phase. 5. Reduce phase. 6. Output phase

Q: What happens in the input and split phases?
A: Hadoop reads input from HDFS and divides files into input splits, usually close to HDFS block size, then assigns one split to each map task.

Q: What is an input split?
A: An input split is a logical chunk of input data assigned to one map task. Important: split = logical, block = physical storage, often one split is close to one HDFS block, but they are not exactly the same concept

Q: Who creates input splits?
A: The InputFormat creates input splits before map tasks begin.

Q: What determines the number of map tasks?
A: The number of map tasks is determined by the number of input splits.

Q: What determines the number of reduce tasks?
A: The programmer sets the number of reduce tasks explicitly. Example: job.setNumReduceTasks(int)

Q: What does a mapper do in WordCount?
A: For each word in a line, the mapper emits: <word, 1>

Q: What does a reducer do in WordCount?
A: For each unique word, the reducer sums all the values and emits: <word, total_count>

Q: What is the WordCount algorithm?
A: Map: tokenize each line into words, emit <word, 1>. Reduce: sum all values for each word, emit <word, sum>

Q: What are Hadoop Writables?
A: Hadoop provides its own serializable types optimized for network transfer and storage in MapReduce. Examples: LongWritable, IntWritable, Text

Q: Why do Hadoop key and value classes implement Writable?
A: Because the framework needs serialization and deserialization support to move data across the network and store intermediate/output data.

Q: Why must keys implement WritableComparable?
A: Because Hadoop sorts keys before sending them to reducers, so keys must support both serialization and comparison.

Q: What is Writable?
A: Writable is a Hadoop interface that provides methods for serialization and deserialization. Important methods: write(DataOutput out), readFields(DataInput in)

Q: What is WritableComparable?
A: WritableComparable extends both: Writable and Java Comparable. So it supports: serialization, deserialization, comparison

Q: What is NullWritable?
A: NullWritable is used when a key or value is unnecessary, helping avoid extra serialization overhead.

Q: What are common Writable wrapper classes?
A: BooleanWritable, ByteWritable, IntWritable, LongWritable, FloatWritable, DoubleWritable, Text, ArrayWritable, MapWritable, NullWritable

Q: What are the three parts needed for a Java MapReduce job?
A: 1. Mapper code. 2. Reducer code. 3. Driver code

Q: What does the Mapper class do?
A: The programmer extends Hadoop's Mapper class and overrides the map() method. Mapper engine flow: setup() → map() per input record → cleanup()

Q: What does the Reducer class do?
A: The programmer extends Hadoop's Reducer class and overrides the reduce() method. Reducer engine flow: setup() → reduce() per key → cleanup()

Q: What does the Context object do?
A: The Context object allows the mapper or reducer to: emit output, access job configuration, report progress, set status messages

Q: What does the driver code do?
A: The driver configures and submits the job. It specifies: job name, jar class, input path, output path, mapper class, reducer class, output key/value types

Q: What does waitForCompletion(true) do?
A: It submits the job, waits until it finishes, and prints verbose progress information if the argument is true.

Q: What is InputFormat?
A: InputFormat is responsible for: selecting input files, creating input splits, creating RecordReader objects

Q: What are common InputFormats?
A: TextInputFormat - default input format, key = byte offset of line, value = line text. KeyValueInputFormat - key = text before first tab, value = remainder of line. SequenceFileInputFormat - used for Hadoop binary sequence files

Q: What is RecordReader?
A: RecordReader reads the raw input defined by an InputSplit and converts it into key-value pairs for the mapper.

Q: What are Hadoop running modes?
A: Local/Standalone Mode - single process, no daemons, useful for testing and debugging. Pseudo-Distributed Mode - all daemons on one machine, useful for development. Fully Distributed Mode - daemons run across multiple machines, used in production

Q: What are special cases of MapReduce jobs?
A: Case 1 - No reducers: Mapper output is written directly to disk, one file per mapper. Case 2 - No mappers: Not possible. Case 3 - Identity reducer: Reducer only sorts/groups mapper output. Case 4 - Identity mapper and reducer: Used for regrouping and resorting data.

Q: What is the important WordCount mapper code idea?
A: The mapper receives: key = byte offset of the line, value = the line text. It tokenizes the line and emits <word, 1>.

Q: What is the important WordCount reducer code idea?
A: The reducer receives: key = a unique word, values = all counts associated with that word. It sums them and emits <word, sum>.

Q: Key differences to remember about Block vs Input Split?
A: block = physical HDFS storage unit, input split = logical processing unit

Q: Key differences to remember about Map vs Reduce?
A: map = transformation / data preparation, reduce = aggregation

Q: Key differences to remember about Intermediate vs Final Output?
A: intermediate output = temporary, local disk, final reducer output = persistent, written to HDFS

---

NOTE 4: Advanced MapReduce

Q: What is the main focus of Advanced MapReduce note?
A: This note focuses on combiners, partitioners, local aggregation, in-mapper combining, algorithmic correctness, and speculative execution in MapReduce.

Q: Why are partitioners needed?
A: The default number of reducers is 1, which is fine for small outputs, but for large outputs it is better to partition data across multiple reducers to use cluster parallelism.

Q: What does a partitioner do?
A: A partitioner divides the intermediate key space and decides which reducer receives each intermediate key-value pair.

Q: How many partitions does a partitioner create?
A: The number of partitions is the same as the number of reduce tasks.

Q: What is the default partitioner in Hadoop?
A: The default partitioner is HashPartitioner.

Q: How does HashPartitioner work?
A: It computes: (key.hashCode() & Integer.MAX_VALUE) % numReduceTasks. This distributes keys approximately evenly across reducers.

Q: When do we need a custom partitioner?
A: A custom partitioner is needed when we want specific keys or key ranges to go to specific reducers instead of using default hash-based distribution.

Q: What is local aggregation?
A: Local aggregation is the process of reducing mapper output on the map side before shuffle, which lowers the number of intermediate key-value pairs sent over the network.

Q: Why is local aggregation important?
A: Because map outputs are written to local disk and then transferred over the network, and both disk I/O and network traffic are expensive.

Q: What is a combiner?
A: A combiner is a mini-reducer that runs after the map phase on the mapper node to aggregate local intermediate results before shuffle.

Q: What is the main benefit of a combiner?
A: A combiner reduces the number of intermediate key-value pairs that must be shuffled across the network, saving bandwidth and improving performance.

Q: On what data does a combiner operate?
A: A combiner operates only on the output generated by one mapper.

Q: Can a reducer be used as a combiner?
A: Yes, but only if the reduce operation is commutative and associative and the combiner preserves correctness.

Q: What constraints must be satisfied for combiners?
A: Correctness must not depend on the combiner. Combiner and reducer must have the same method signature. Combiner input/output types must match mapper output and reducer input types. The operation should be associative and commutative.

Q: Does Hadoop guarantee combiner execution?
A: No. Hadoop does not guarantee that a combiner will run, how many times it will run, or even that it will run at all.

Q: What is the exam-safe rule about combiners?
A: A MapReduce job must always produce the same correct result with or without a combiner.

Q: Why are combiners only an optimization?
A: Because they improve performance but must never change the correctness of the algorithm.

Q: What is in-mapper combining?
A: In-mapper combining is a design pattern where combiner functionality is moved directly into the mapper by preserving state across multiple map calls.

Q: How does in-mapper combining work?
A: The mapper stores partial aggregates in an in-memory data structure such as a HashMap, and emits results later instead of emitting <key, value> immediately for every input item.

Q: What is speculative execution?
A: Speculative execution is a technique where Hadoop launches a duplicate copy of a slow-running task on another node as a backup.

Q: Why is speculative execution used?
A: Because a single slow task can delay the completion of the entire job, so Hadoop tries to hedge against slow tasks by launching duplicates.

Q: How does speculative execution work?
A: Hadoop monitors task progress, detects tasks running much slower than average, launches a duplicate task elsewhere, whichever copy finishes first wins, the duplicate is killed

Q: Is speculative execution enabled by default?
A: Yes, speculative execution is enabled by default.

Q: How can speculative execution be disabled?
A: It can be disabled separately for mappers and reducers through job configuration options.

---

NOTE 5: Apache Avro

Q: What is Apache Avro?
A: A cross-language data serialization system used in Hadoop.

Q: What is the main advantage of Avro over Writable?
A: Avro is language-independent, while Writable is Java-only.

Q: What is serialization?
A: Conversion of objects into binary format for storage or transmission.

Q: What is deserialization?
A: Conversion of binary data back into objects.

Q: Why is serialization required in distributed systems?
A: Because data is transferred between nodes via RPC/network.

Q: What makes Avro efficient?
A: Compact binary format, No redundant metadata, Fast processing

Q: What is the format of Avro schema?
A: JSON (.avsc file)

Q: What is stored in an Avro data file?
A: Data, Schema (in metadata)

Q: Why is Avro called self-describing?
A: Because schema is embedded inside the file.

Q: What is the extension of Avro data file?
A: .avro

Q: What is schema evolution?
A: Ability to change schema while maintaining compatibility with old data.

Q: Do reader and writer schemas need to match?
A: No — Avro resolves differences automatically.

Q: What must be provided when adding a new field?
A: Default value (VERY IMPORTANT exam point)

Q: What happens if no default value is provided?
A: The schema becomes incompatible → error

Q: What is schema resolution?
A: Matching reader schema with writer schema during deserialization.

Q: What happens to unknown fields in writer schema?
A: They are ignored by the reader.

Q: What happens if reader expects a missing field?
A: It uses the default value.

Q: Why is Avro suitable for big data?
A: Because it is: Splittable, Compact, Efficient

Q: What enables Avro files to be split?
A: Block markers inside the file

Q: Why is splitting important?
A: It allows parallel processing in HDFS/MapReduce.

Q: What does "language neutral" mean?
A: Data can be read/written in multiple programming languages.

Q: What is Avro-tools?
A: A CLI tool for: Reading, Writing, Converting Avro files

Q: Does Avro require code generation?
A: No (optional, not required)

Q: What is the advantage of not requiring code generation?
A: Simpler usage, More flexible, Faster development

Q: What is the key idea behind Avro design?
A: Schema + Data together

Q: What is a major disadvantage of Avro?
A: Binary format is not human-readable.

Q: Why is Avro better than JSON for big data?
A: Smaller size, Faster processing, Schema enforcement

Q: What are Avro primitive types?
A: null, boolean, int, long, float, double, bytes, string

Q: What are Avro complex types?
A: record, array, map, enum, fixed, union

Q: What is a record in Avro?
A: A structure with named fields (like a class).

Q: What is a union type?
A: A field that can have multiple possible types.

Q: What is the biggest exam trap about Avro?
A: "Default value is required when adding new field"

Q: What ensures backward compatibility?
A: Providing default values for new fields.

Q: What ensures forward compatibility?
A: Reader schema ignoring unknown fields.

Q: Can Avro change field types?
A: No — must create a new field instead.

Q: Why is Avro preferred in Hadoop ecosystem?
A: Because it supports: Efficiency, Scalability, Interoperability

Q: What happens if schema is not included with data?
A: System cannot interpret binary data correctly.

Q: What is the difference between Avro and Java serialization?
A: Feature: Avro - Binary, Java Serialization - Binary; Schema: Avro - Explicit, Java Serialization - Embedded class; Language: Avro - Multi-language, Java Serialization - Java only; Efficiency: Avro - High, Java Serialization - Lower

Q: Why is Avro good for distributed systems?
A: Because it minimizes: Network cost, Storage size

Q: What is the most important concept to remember?
A: Schema evolution + default values + self-describing files

Q: Why must a new field include a default value?
A: To allow old data to be read with new schema.

Q: What makes Avro files self-describing?
A: Schema stored in metadata.

Q: Why is Avro suitable for MapReduce?
A: Because files are splittable and efficient.

Q: Does Avro need schema at runtime?
A: Yes — but it is embedded in file, so no external dependency.

Q: Is Avro human-readable?
A: No — binary format.

---

NOTE 6: Apache Pig

Q: What is Apache Pig?
A: A high-level data flow language built on top of MapReduce to simplify big data processing.

Q: Who developed Apache Pig?
A: Yahoo

Q: Why was Pig created?
A: To reduce complexity and development time of MapReduce.

Q: What is Pig Latin?
A: A data flow language used to express transformations.

Q: What does Pig Latin compile into?
A: MapReduce jobs

Q: What is the biggest advantage of Pig?
A: Less coding, faster development

Q: What is the main philosophy of Pig?
A: "Do less and accomplish more"

Q: What type of language is Pig Latin?
A: Procedural (data flow based)

Q: What is a relation in Pig?
A: A bag of tuples

Q: What is a tuple?
A: Ordered set of fields

Q: What is a bag?
A: Collection of tuples (can have duplicates)

Q: What is a field?
A: Atomic value

Q: What is the default data type in Pig?
A: bytearray

Q: What are Pig execution modes?
A: Local mode, Hadoop (MapReduce) mode

Q: Which is default execution mode?
A: Hadoop mode

Q: What is Local mode used for?
A: Development and testing

Q: What is Grunt?
A: Interactive shell for Pig

Q: What triggers execution in Pig?
A: DUMP or STORE

Q: What is lazy evaluation in Pig?
A: Pig does not execute until output is required.

Q: Why is lazy evaluation important?
A: Avoids unnecessary computation → better performance

Q: What is LOAD?
A: Loads data into a relation.

Q: What is STORE?
A: Saves data to storage.

Q: What is DUMP?
A: Displays output to console.

Q: What is FILTER?
A: Removes unwanted rows.

Q: What is FOREACH GENERATE?
A: Transforms each record.

Q: What is GROUP BY?
A: Groups records into bags.

Q: What is ORDER BY?
A: Sorts data.

Q: What does LIMIT do?
A: Restricts number of records.

Q: What is DISTINCT?
A: Removes duplicates.

Q: What is JOIN?
A: Combines relations (flat output).

---

NOTE 7: Apache Pig Advanced

Q: What is COGROUP?
A: Groups multiple relations by key.

Q: Difference between JOIN and COGROUP?
A: JOIN → flat output, COGROUP → nested output

Q: What is SPLIT?
A: Splits data into multiple relations.

Q: What is TOKENIZE?
A: Splits string into words.

Q: What is FLATTEN?
A: Removes nesting.

Q: What is GROUP ALL?
A: Groups all data into one record.

Q: What does GROUP output contain?
A: group key, bag of records

Q: What is schema in Pig?
A: Defines field names and types.

Q: Can Pig work without schema?
A: Yes (fields accessed by position)

Q: How to reference fields by position?
A: $0, $1, etc.

Q: What happens if type casting fails?
A: Value becomes NULL

Q: How to detect corrupt data?
A: Filter by NULL values.

Q: How to separate good and bad data?
A: SPLIT operator

Q: How to detect missing fields?
A: SIZE function

Q: What is multiquery execution?
A: Pig optimizes multiple outputs into one job.

Q: What is UDF?
A: User Defined Function

Q: Why use UDF?
A: To extend Pig functionality.

Q: What languages support UDF?
A: Java, Python, etc.

Q: What is EvalFunc?
A: Base class for evaluation UDFs.

Q: What method must be implemented in EvalFunc?
A: exec()

Q: What does FilterFunc return?
A: Boolean

Q: What is DEFINE?
A: Creates alias for UDF.

Q: What is REGISTER?
A: Loads external JAR file.

Q: Where do UDFs run?
A: On each mapper/reducer

Q: Can UDF share state across nodes?
A: No (parallel execution)

Q: What is fragment replicate join?
A: Map-side join using small dataset.

Q: What is dynamic invoker?
A: Call Java methods without writing UDF.

Q: What is Piggybank?
A: Repository of shared UDFs.

Q: When should you use MapReduce instead of Pig?
A: When: Need full control, High performance required

Q: What is the most important concept in Pig?
A: Lazy evaluation + high-level abstraction + UDF flexibility.`;

// Load questions on page load
function loadQuestions() {
    try {
        parseQuestions(questionsData);
        if (questions.length > 0) {
            renderQuestion();
        } else {
            document.getElementById('content').innerHTML = 
                `<div class="error">No questions were found. Please check the data.</div>`;
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('content').innerHTML = 
            `<div class="error">Error loading questions: ${error.message}</div>`;
    }
}

// Parse questions from text
function parseQuestions(text) {
    const sections = text.split(/NOTE \d+:/);
    let noteNum = 1;

    for (let section of sections) {
        if (section.trim().length === 0) continue;

        const lines = section.trim().split('\n').filter(l => l.trim());
        let i = 0;

        // Skip note title line
        while (i < lines.length && !lines[i].startsWith('Q:')) {
            i++;
        }

        // Extract questions and answers
        while (i < lines.length) {
            if (lines[i].startsWith('Q:')) {
                const questionText = lines[i].replace('Q:', '').trim();
                i++;

                // Find the answer
                let answerText = '';
                while (i < lines.length && !lines[i].startsWith('Q:') && !lines[i].startsWith('---')) {
                    const line = lines[i].trim();
                    if (line.startsWith('A:')) {
                        answerText = line.replace('A:', '').trim();
                    } else if (line.length > 0) {
                        answerText += ' ' + line;
                    }
                    i++;
                }

                questions.push({
                    question: questionText,
                    answer: answerText.trim(),
                    note: noteNum
                });
            } else {
                i++;
            }
        }

        noteNum++;
    }
}

// Render current question
function renderQuestion() {
    if (questions.length === 0) return;

    const q = questions[currentIndex];
    const progress = (currentIndex + 1) / questions.length * 100;
    const noteChanged = !currentIndex || q.note !== questions[currentIndex - 1]?.note;

    let html = `
        <div class="progress">
            <span>Question ${currentIndex + 1} of ${questions.length}</span>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${progress}%"></div>
            </div>
        </div>
    `;

    if (noteChanged) {
        html += `<div class="note-label">NOTE ${q.note}</div>`;
    }

    html += `
        <div class="question-container">
            <div class="question-text">${escapeHtml(q.question)}</div>
            
            <div class="button-group">
                <button class="btn btn-primary" onclick="toggleAnswer()">
                    Show Answer
                </button>
            </div>
            
            <div class="answer-container" id="answerBox">
                <div class="answer-text">${escapeHtml(q.answer)}</div>
            </div>
        </div>
    `;

    document.getElementById('content').innerHTML = html + getNavigationHTML();
}

// Get navigation HTML
function getNavigationHTML() {
    const isLast = currentIndex === questions.length - 1;
    const isFirst = currentIndex === 0;

    let html = `
        <div class="navigation">
            <div class="nav-buttons">
                <button class="btn-nav" onclick="previousQuestion()" ${isFirst ? 'disabled' : ''}>
                    ← Previous
                </button>
                <button class="btn-nav" onclick="nextQuestion()" ${isLast ? 'disabled' : ''}>
                    Next →
                </button>
            </div>
            <div class="jump-to">
                <input type="number" id="jumpInput" min="1" max="${questions.length}" placeholder="Go to Q#" />
                <button class="btn-nav" onclick="goToSpecificQuestion()">Go</button>
            </div>
            <div class="stats">${currentIndex + 1} / ${questions.length}</div>
        </div>
    `;

    if (isLast) {
        html += `
            <div class="quick-nav">
                <h3>🎯 Quick Navigation - Jump to Question</h3>
                <div class="quick-nav-list">
                    ${questions.map((q, i) => 
                        `<div class="quick-nav-item" onclick="goToQuestion(${i})">
                            Q${i + 1}: ${q.question.substring(0, 45)}...
                        </div>`
                    ).join('')}
                </div>
            </div>
        `;
    }

    return html;
}

// Navigation functions
function nextQuestion() {
    if (currentIndex < questions.length - 1) {
        currentIndex++;
        renderQuestion();
        window.scrollTo(0, 0);
    }
}

function previousQuestion() {
    if (currentIndex > 0) {
        currentIndex--;
        renderQuestion();
        window.scrollTo(0, 0);
    }
}

function goToQuestion(index) {
    currentIndex = index;
    renderQuestion();
    window.scrollTo(0, 0);
}

function goToSpecificQuestion() {
    const input = document.getElementById('jumpInput');
    const num = parseInt(input.value);
    if (num >= 1 && num <= questions.length) {
        goToQuestion(num - 1);
        input.value = ''; // Clear input after jump
    } else {
        alert(`Please enter a valid question number between 1 and ${questions.length}`);
    }
}

function toggleAnswer() {
    const answerBox = document.getElementById('answerBox');
    const button = document.querySelector('.btn-primary');
    
    answerBox.classList.toggle('show');
    
    // Update button text based on whether answer is shown
    if (answerBox.classList.contains('show')) {
        button.textContent = 'Hide Answer ✓';
    } else {
        button.textContent = 'Show Answer';
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Load on page load
window.addEventListener('DOMContentLoaded', loadQuestions);
document.addEventListener('DOMContentLoaded', loadQuestions);
