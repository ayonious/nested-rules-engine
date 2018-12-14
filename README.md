# dfs rule engine

[![Build Status](https://travis-ci.org/ayonious/shifu.svg?branch=master)](https://travis-ci.org/ayonious/shifu)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fayonious%2Fdfs-rule-engine.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fayonious%2Fdfs-rule-engine?ref=badge_shield)
[![dependencies Status](https://david-dm.org/ayonious/dfs-rule-engine/status.svg)](https://david-dm.org/ayonious/dfs-rule-engine)
[![devDependencies Status](https://david-dm.org/ayonious/dfs-rule-engine/dev-status.svg)](https://david-dm.org/ayonious/dfs-rule-engine?type=dev)

A rule engine that has order of rules and nested rules

You have a set of rules that computes something. Some rules are dependent on each other. And you dont want to execute unnecessary rules. At the end you want your set of rules look like making some sense. Here are some ideas 


# Ideas to Be implemented
1. Our program should be able to debug it self. Means every singe rule that is fired and the inputs change should be able to be generated when engine is Run in verbose mode

2. We should be able to draw a visual diagram that is readable by non Technical people

3. Engine should have some way to combine AND, OR functions. program becomes super readable if this is done


```
aasf:
  state1 or state2:
    (state4 or state33) and state5:
      thnigs_look_great
```

Priority of functions to implements an, or, ()

4. There should be some actions that sets some variables in output rather than actually return output.

```
aasf:
  state1:
    action:_set_variable_12_as($variable) #this wont be return statement
    (state4 or state33) and state5:
      thnigs_look_great
```