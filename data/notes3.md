# Big Data Technologies - Note 3
## MapReduce Paradigm

This README summarizes the most important exam concepts from **Note 3: MapReduce Paradigm**.


# 1. What is MapReduce?

MapReduce is a massively scalable parallel processing framework used to process big data stored in HDFS.

## Why is MapReduce important?
It hides system-level complexity such as synchronization, inter-process communication, data distribution, and machine failures from the programmer.


# 2. What is the main idea behind solving large data problems?

The main approach is **divide and conquer**:
- break a large problem into smaller tasks
- process tasks in parallel
- combine partial results


# 3. What problems does MapReduce solve for programmers?

MapReduce automatically handles:
- task assignment
- data distribution
- synchronization
- fault tolerance
- parallel execution across many machines


# 4. Where does the name MapReduce come from?

The terms **map** and **reduce** come from functional programming.

- **map** applies a function to each element in a collection
- **reduce** aggregates multiple values into one result


# 5. What is map in MapReduce?

Map is a transformation phase that processes input key-value pairs and emits intermediate key-value pairs.


# 6. What is reduce in MapReduce?

Reduce is an aggregation phase that processes all values belonging to the same key and emits final output key-value pairs.


# 7. What is the basic data structure in MapReduce?

The basic data structure in MapReduce is the **key-value pair**.

Important:
- no value exists without a key
- both map input/output and reduce input/output are key-value pairs


# 8. What are the signatures of map and reduce?

Map:
`map : (k1, v1) -> list(k2, v2)`

Reduce:
`reduce : (k2, list(v2)) -> list(k3, v3)`


# 9. Why is map easily parallelizable?

Each mapper works independently on a different input split, so map tasks can run in parallel without needing communication among them.


# 10. Why does reduce require data movement?

Reduce requires all values for the same key to be brought together from different mappers, which causes network transfer during shuffle.


# 11. What is the implicit operation between map and reduce?

The framework automatically performs a distributed **group by** on intermediate keys between map and reduce.


# 12. What happens between map and reduce?

The framework performs:
- shuffle
- sort
- group by key

This phase is automatic.


# 13. What is shuffle?

Shuffle is the process of transferring mapper output across the network and grouping all values with the same key for reducers.


# 14. What is sorted in MapReduce?

Intermediate data is sorted **by key**, not by value.

Reducers receive keys in sorted order.


# 15. Is MapReduce output globally sorted?

Not always.

- With **one reducer**, output is globally sorted by key.
- With **multiple reducers**, each output file is sorted internally, but global ordering across files is not guaranteed.


# 16. What are the phases of a MapReduce job?

A MapReduce job executes in six phases:

1. Input phase
2. Split phase
3. Map phase
4. Shuffle/Sort phase
5. Reduce phase
6. Output phase


# 17. What happens in the input and split phases?

Hadoop reads input from HDFS and divides files into **input splits**, usually close to HDFS block size, then assigns one split to each map task.


# 18. What is an input split?

An input split is a logical chunk of input data assigned to one map task.

Important:
- split = logical
- block = physical storage
- often one split is close to one HDFS block, but they are not exactly the same concept


# 19. Who creates input splits?

The **InputFormat** creates input splits before map tasks begin.


# 20. What determines the number of map tasks?

The number of map tasks is determined by the number of input splits.


# 21. What determines the number of reduce tasks?

The programmer sets the number of reduce tasks explicitly.

Example:
`job.setNumReduceTasks(int)`


# 22. What does a mapper do in WordCount?

For each word in a line, the mapper emits:

`<word, 1>`


# 23. What does a reducer do in WordCount?

For each unique word, the reducer sums all the values and emits:

`<word, total_count>`


# 24. What is the WordCount algorithm?

Map:
- tokenize each line into words
- emit `<word, 1>`

Reduce:
- sum all values for each word
- emit `<word, sum>`


# 25. What are Hadoop Writables?

Hadoop provides its own serializable types optimized for network transfer and storage in MapReduce.

Examples:
- `LongWritable`
- `IntWritable`
- `Text`


# 26. Why do Hadoop key and value classes implement Writable?

Because the framework needs serialization and deserialization support to move data across the network and store intermediate/output data.


# 27. Why must keys implement WritableComparable?

Because Hadoop sorts keys before sending them to reducers, so keys must support both serialization and comparison.


# 28. What is Writable?

`Writable` is a Hadoop interface that provides methods for serialization and deserialization.

Important methods:
- `write(DataOutput out)`
- `readFields(DataInput in)`


# 29. What is WritableComparable?

`WritableComparable` extends both:
- `Writable`
- Java `Comparable`

So it supports:
- serialization
- deserialization
- comparison


# 30. What is NullWritable?

`NullWritable` is used when a key or value is unnecessary, helping avoid extra serialization overhead.


# 31. What are common Writable wrapper classes?

Examples:
- `BooleanWritable`
- `ByteWritable`
- `IntWritable`
- `LongWritable`
- `FloatWritable`
- `DoubleWritable`
- `Text`
- `ArrayWritable`
- `MapWritable`
- `NullWritable`


# 32. What are the three parts needed for a Java MapReduce job?

1. Mapper code
2. Reducer code
3. Driver code


# 33. What does the Mapper class do?

The programmer extends Hadoop’s `Mapper` class and overrides the `map()` method.

Mapper engine flow:
- `setup()`
- `map()` per input record
- `cleanup()`


# 34. What does the Reducer class do?

The programmer extends Hadoop’s `Reducer` class and overrides the `reduce()` method.

Reducer engine flow:
- `setup()`
- `reduce()` per key
- `cleanup()`


# 35. What does the Context object do?

The `Context` object allows the mapper or reducer to:
- emit output
- access job configuration
- report progress
- set status messages


# 36. What does the driver code do?

The driver configures and submits the job.

It specifies:
- job name
- jar class
- input path
- output path
- mapper class
- reducer class
- output key/value types


# 37. What does waitForCompletion(true) do?

It submits the job, waits until it finishes, and prints verbose progress information if the argument is `true`.


# 38. What is InputFormat?

InputFormat is responsible for:
- selecting input files
- creating input splits
- creating RecordReader objects


# 39. What are common InputFormats?

## TextInputFormat
- default input format
- key = byte offset of line
- value = line text

## KeyValueInputFormat
- key = text before first tab
- value = remainder of line

## SequenceFileInputFormat
- used for Hadoop binary sequence files


# 40. What is RecordReader?

RecordReader reads the raw input defined by an InputSplit and converts it into key-value pairs for the mapper.


# 41. What are Hadoop running modes?

## Local / Standalone Mode
- single process
- no daemons
- useful for testing and debugging

## Pseudo-Distributed Mode
- all daemons on one machine
- useful for development

## Fully Distributed Mode
- daemons run across multiple machines
- used in production


# 42. What are special cases of MapReduce jobs?

## Case 1 - No reducers
Mapper output is written directly to disk, one file per mapper.

## Case 2 - No mappers
Not possible.

## Case 3 - Identity reducer
Reducer only sorts/groups mapper output.

## Case 4 - Identity mapper and reducer
Used for regrouping and resorting data.


# 43. Important WordCount mapper code idea

The mapper receives:
- key = byte offset of the line
- value = the line text

It tokenizes the line and emits `<word, 1>`.


# 44. Important WordCount reducer code idea

The reducer receives:
- key = a unique word
- values = all counts associated with that word

It sums them and emits `<word, sum>`.


# 45. Key exam differences to remember

## Block vs Input Split
- block = physical HDFS storage unit
- input split = logical processing unit

## Map vs Reduce
- map = transformation / data preparation
- reduce = aggregation

## Intermediate vs Final Output
- intermediate output = temporary, local disk
- final reducer output = persistent, written to HDFS


# Key Exam Questions

These are very likely to appear in the exam:

1. What is MapReduce?
2. Why is map easily parallelizable?
3. Why does reduce require data movement?
4. What is shuffle?
5. What is the implicit operation between map and reduce?
6. What are the phases of a MapReduce job?
7. What is an input split?
8. What determines the number of map tasks?
9. What determines the number of reduce tasks?
10. Explain the WordCount algorithm.
11. What is Writable?
12. What is WritableComparable?
13. Why must keys be comparable?
14. What is InputFormat?
15. What is RecordReader?
16. What are Hadoop running modes?
17. Can a MapReduce job run without reducers?
18. Can a MapReduce job run without mappers?


# Quick Memory Lines

- **Map = prepare**
- **Shuffle = move + group**
- **Reduce = aggregate**
- **InputSplit = one map task**
- **One reducer = globally sorted output**
- **Multiple reducers = one output file per reducer**
