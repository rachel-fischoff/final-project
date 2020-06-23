import tweepy
import config
# import re

    # Authenticate to Twitter
    auth = tweepy.AppAuthHandler(config.api_key, config.api_secret)
    api = tweepy.API(auth, wait_on_rate_limit=True, wait_on_rate_limit_notify=True)
    
    # add parameteres rpp=10, lang = "en"
    for tweet in tweepy.Cursor(api.search, lang='en', q=query).items(10):
        print('created at: ', tweet.created_at, 'tweet content ' + tweet.text, 
            'profile pic url ' + tweet.user.profile_image_url_https, 'user name ' +
        tweet.user.name, 'user location ' + tweet.user.location, 'screen name '
        + tweet.user.screen_name)





