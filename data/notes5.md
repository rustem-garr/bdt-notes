# Big Data Technologies - Note 5
## Apache Avro


1. What is Apache Avro?

A cross-language data serialization system used in Hadoop.

2. What is the main advantage of Avro over Writable?

Avro is language-independent, while Writable is Java-only.

3. What is serialization?

Conversion of objects into binary format for storage or transmission.

4. What is deserialization?

Conversion of binary data back into objects.

5. Why is serialization required in distributed systems?

Because data is transferred between nodes via RPC/network.

6. What makes Avro efficient?
Compact binary format
No redundant metadata
Fast processing
7. What is the format of Avro schema?

👉 JSON (.avsc file)

8. What is stored in an Avro data file?
Data
Schema (in metadata)
9. Why is Avro called self-describing?

Because schema is embedded inside the file.

10. What is the extension of Avro data file?

👉 .avro

11. What is schema evolution?

Ability to change schema while maintaining compatibility with old data.

12. Do reader and writer schemas need to match?

❌ No — Avro resolves differences automatically.

13. What must be provided when adding a new field?

👉 Default value (VERY IMPORTANT exam point)

14. What happens if no default value is provided?

The schema becomes incompatible → error

15. What is schema resolution?

Matching reader schema with writer schema during deserialization.

16. What happens to unknown fields in writer schema?

They are ignored by the reader.

17. What happens if reader expects a missing field?

It uses the default value.

18. Why is Avro suitable for big data?

Because it is:

Splittable
Compact
Efficient
19. What enables Avro files to be split?

👉 Block markers inside the file

20. Why is splitting important?

It allows parallel processing in HDFS/MapReduce.

21. What does "language neutral" mean?

Data can be read/written in multiple programming languages.

22. What is Avro-tools?

A CLI tool for:

Reading
Writing
Converting Avro files
23. Does Avro require code generation?

❌ No (optional, not required)

24. What is the advantage of not requiring code generation?
Simpler usage
More flexible
Faster development
25. What is the key idea behind Avro design?

👉 Schema + Data together

26. What is a major disadvantage of Avro?

Binary format is not human-readable.

27. Why is Avro better than JSON for big data?
Smaller size
Faster processing
Schema enforcement
28. What are Avro primitive types?

null, boolean, int, long, float, double, bytes, string

29. What are Avro complex types?

record, array, map, enum, fixed, union

30. What is a record in Avro?

A structure with named fields (like a class).

31. What is a union type?

A field that can have multiple possible types.

32. What is the biggest exam trap about Avro?

👉 "Default value is required when adding new field"

33. What ensures backward compatibility?

Providing default values for new fields.

34. What ensures forward compatibility?

Reader schema ignoring unknown fields.

35. Can Avro change field types?

❌ No — must create a new field instead.

36. Why is Avro preferred in Hadoop ecosystem?

Because it supports:

Efficiency
Scalability
Interoperability
37. What happens if schema is not included with data?

System cannot interpret binary data correctly.

38. What is the difference between Avro and Java serialization?
Feature	Avro	Java Serialization
Format	Binary	Binary
Schema	Explicit	Embedded class
Language	Multi-language	Java only
Efficiency	High	Lower
39. Why is Avro good for distributed systems?

Because it minimizes:

Network cost
Storage size
40. What is the most important concept to remember?

👉 Schema evolution + default values + self-describing files

41. Why must a new field include a default value?

👉 To allow old data to be read with new schema.

42. What makes Avro files self-describing?

👉 Schema stored in metadata.

43. Why is Avro suitable for MapReduce?

👉 Because files are splittable and efficient.

44. Does Avro need schema at runtime?

👉 Yes — but it is embedded in file, so no external dependency.

45. Is Avro human-readable?

👉 ❌ No — binary format.