import random

print("你好，世界");

random.random();

# 斐波那契函数
a, b = 0, 1
while b < 1000:
    print(b, end=",");
    a = b;
    b = a + b;

print("\n")


# 自定义函数
def hello():
    print("hello");

hello();