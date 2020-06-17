import tweepy
import config
# import api_key, api_secret, access_token, token_secret

# Authenticate to Twitter
auth = tweepy.AppAuthHandler(config.api_key, config.api_secret)
api = tweepy.API(auth, wait_on_rate_limit=True, wait_on_rate_limit_notify=True)

for tweet in tweepy.Cursor(api.search, q = "tweepy").items(10):
    print(tweet.text)












