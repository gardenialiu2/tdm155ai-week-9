---
title: Prompt and script — word-by-word diff of the two stanzas
date: 2026-10-19
author: prompt by Jo; script by Claude; edited by Jo
---

**My prompt:** "Here are two stanzas of a poem (below). Write me a tiny Python script that prints which words are removed and which are added going from the first to the second, and counts letters in each, because I'm going to set them in metal type and need to know how many sorts change."

**What came back** (I changed the tokenizer to keep the dashes, since dashes are sorts too):

```python
import re, sys
a = open(sys.argv[1]).read(); b = open(sys.argv[2]).read()
tok = lambda s: re.findall(r"[A-Za-z']+|–", s)
A, B = tok(a), tok(b)
print("out:", len("".join(A)), "sorts;", "in:", len("".join(B)), "sorts")
print("removed:", [w for w in A if w not in B])
print("added:", [w for w in B if w not in A])
```

**Output on the second stanzas:** out: 212 sorts, in: 247 sorts (letters and dashes, not spaces). Removed: nearly everything. Added: nearly everything. Which is the point: the second stanza isn't a revision, it's a replacement. That became the film's structure.
