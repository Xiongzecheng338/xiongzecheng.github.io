import requests
import json
import feedparser
import os
from datetime import datetime

# --- 配置区域 ---
GITHUB_USERNAME = "badhope"  # 你的 GitHub 用户名
CSDN_ID = "weixin_56622231" # 你的 CSDN ID (从主页链接获取)
JUEJIN_ID = "你的掘金ID"     # 你的掘金 ID (可选，如果有的话)
OUTPUT_DIR = "src/data"

# --- 辅助函数 ---
def get_github_repos():
    print("正在抓取 GitHub 数据...")
    url = f"https://api.github.com/users/{GITHUB_USERNAME}/repos?sort=updated&per_page=6"
    try:
        response = requests.get(url)
        if response.status_code == 200:
            repos = response.json()
            data = []
            for repo in repos:
                data.append({
                    "title": repo["name"],
                    "description": repo.get("description", "暂无描述"),
                    "tags": [repo.get("language", "Code")], # 简化处理，只用主语言
                    "link": repo["html_url"],
                    "github": repo["html_url"],
                    "stars": repo["stargazers_count"],
                    "forks": repo["forks_count"],
                })
            return data
        else:
            print(f"GitHub API 请求失败: {response.status_code}")
    except Exception as e:
        print(f"抓取 GitHub 出错: {e}")
    return []

def get_articles():
    print("正在抓取博客文章...")
    articles = []
    
    # 1. 尝试抓取掘金 RSS (掘金支持 RSS)
    # 注意：掘金官方 RSS 接口可能会变，这里使用一个通用的 RSS 订阅逻辑
    # 如果你有具体的 RSS 地址，可以直接替换
    juejin_rss = f"https://api.juejin.cn/content_api/v1/article/query_list?user_id={JUEJIN_ID}" # 这是伪代码，实际掘金API需鉴权
    # 为了稳定性，我们改用 RSSHub 或直接模拟数据抓取逻辑
    # 这里为了演示稳定性，我们先保留模拟数据逻辑，后续你可以替换为真实的 RSS 地址
    # 比如: feed = feedparser.parse("https://rss.shab.fun/juejin/user/你的ID")
    
    # 2. 模拟/备用的静态数据 (防止 API 挂掉导致网站空白)
    # 你可以定期手动更新这里，或者配置 RSS 抓取
    articles.append({
        "title": "数据清洗与标准化流程实践心得",
        "platform": "CSDN",
        "date": "2026-01-15",
        "link": "https://blog.csdn.net/weixin_56622231",
        "desc": "分享了在医药公司实习期间处理数据的经验。",
    })
    
    return articles

def get_quotes():
    print("正在抓取名人名言...")
    # 使用免费公开的 API
    try:
        response = requests.get("https://api.quotable.io/random?tags=technology,famous-quotes")
        if response.status_code == 200:
            data = response.json()
            return {
                "content": data["content"],
                "author": data["author"]
            }
    except:
        pass
    
    # 备用名言
    return {
        "content": "未来的技术定会愈发先进。",
        "author": "熊泽城"
    }

# --- 主执行逻辑 ---
if __name__ == "__main__":
    # 确保目录存在
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)

    # 1. 抓取 GitHub
    repos = get_github_repos()
    with open(f"{OUTPUT_DIR}/worksData.json", "w", encoding="utf-8") as f:
        json.dump(repos, f, ensure_ascii=False, indent=2)
    print(f"成功更新 {len(repos)} 个 GitHub 项目")

    # 2. 抓取文章 (这里为了稳定性，暂存为静态，后续可扩展)
    articles = get_articles()
    # 如果你想自动更新文章，可以在这里写入文件
    
    # 3. 抓取名言
    quote = get_quotes()
    with open(f"{OUTPUT_DIR}/quote.json", "w", encoding="utf-8") as f:
        json.dump(quote, f, ensure_ascii=False, indent=2)
    print("成功更新名人名言")
