import tweepy
import config
# import re


def get_tweets(query):
    # Authenticate to Twitter
    auth = tweepy.AppAuthHandler(config.api_key, config.api_secret)
    api = tweepy.API(auth, wait_on_rate_limit=True, wait_on_rate_limit_notify=True)
    # add parameteres rpp=10, lang = "en"
    for tweet in tweepy.Cursor(api.search, lang='en', q=query).items(10):
        return
        [{'text': tweet.text}, {'profile_pic': tweet.user.profile_image_url}, {'user_screen_name': tweet.user.screen_name}]


if __name__ == "__main__":
    get_tweets()