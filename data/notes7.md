# Notes 7

⸻

31. What is COGROUP?

Groups multiple relations by key.

⸻

32. Difference between JOIN and COGROUP?
	•	JOIN → flat output
	•	COGROUP → nested output  ￼

⸻

33. What is SPLIT?

Splits data into multiple relations.

⸻

34. What is TOKENIZE?

Splits string into words.

⸻

35. What is FLATTEN?

Removes nesting.

⸻

36. What is GROUP ALL?

Groups all data into one record.

⸻

37. What does GROUP output contain?
	•	group key
	•	bag of records

⸻

38. What is schema in Pig?

Defines field names and types.

⸻

39. Can Pig work without schema?

👉 Yes (fields accessed by position)

⸻

40. How to reference fields by position?

👉 $0, $1, etc.

⸻

41. What happens if type casting fails?

👉 Value becomes NULL  ￼

🔥 VERY IMPORTANT

⸻

42. How to detect corrupt data?

Filter by NULL values.

⸻

43. How to separate good and bad data?

👉 SPLIT operator  ￼

⸻

44. How to detect missing fields?

👉 SIZE function

⸻

45. What is multiquery execution?

Pig optimizes multiple outputs into one job.

⸻

46. What is UDF?

User Defined Function

⸻

47. Why use UDF?

To extend Pig functionality.

⸻

48. What languages support UDF?

Java, Python, etc.

⸻

49. What is EvalFunc?

Base class for evaluation UDFs.

⸻

50. What method must be implemented in EvalFunc?

👉 exec()

⸻

51. What does FilterFunc return?

👉 Boolean

⸻

52. What is DEFINE?

Creates alias for UDF.

⸻

53. What is REGISTER?

Loads external JAR file.

⸻

54. Where do UDFs run?

👉 On each mapper/reducer  ￼

⸻

55. Can UDF share state across nodes?

❌ No (parallel execution)

⸻

56. What is fragment replicate join?

Map-side join using small dataset.

⸻

57. What is dynamic invoker?

Call Java methods without writing UDF.

⸻

58. What is Piggybank?

Repository of shared UDFs.

⸻

59. When should you use MapReduce instead of Pig?

👉 When:
	•	Need full control
	•	High performance required  ￼

⸻

60. What is the most important concept in Pig?

👉 Lazy evaluation + high-level abstraction + UDF flexibility