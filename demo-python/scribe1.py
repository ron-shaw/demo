# 该程序是对百度的首页进行分析，并提取出其搜索框上面的导航条
import re

import httplib2
from lxml import etree


def main():
    http = httplib2.Http()
    response, content = http.request("http://www.baidu.com", 'GET')
    print("response:", response)
    print("content:", content)

    tree = etree.HTML(content)

    # 上面的注释为要查找的部分html
    # <p id=nv><a href=http://news.baidu.com>新闻</a><b>网页</b>
    # <a href=http://tieba.baidu.com>贴吧</a><a href=http://zhidao.baidu.com>知道</a>
    # <a href=http://mp3.baidu.com>MP3</a><a href=http://image.baidu.com>图片</a>
    # <a href=http://video.baidu.com>视频</a><a href=http://map.baidu.com>地图</a></p>

    # 下面开始查找id为nv的p标签下的所有<a>的href值
    hyperlinks = tree.xpath(u'//p[@id="nv"]/a/@href')
    print("hyperlinks:", hyperlinks)
    for hyperlink in hyperlinks:
        print("hyperlink:", hyperlink)

        # 查找id为nv的p标签下的所有<a>节点
    a_nodes = tree.xpath(u'//p[@id="nv"]/a')
    print("a_nodes_length:", len(a_nodes))
    for a_node in a_nodes:
        print("<a>:", a_node.text, a_node.attrib['href'])
    print("\n")

    # 通过正则表达式查找<p id="nv">的标签内容，匹配的内容为正则表达式中的"()"内的内容
    name_flag = '<p id="nv">(.+?)</p>'
    name_re = re.compile(name_flag, re.S)
    name_regx = name_re.search(content)
    print(name_regx)
    name = name_regx.group(1)
    print("name:", name)


if __name__ == "__main__":
    main()
