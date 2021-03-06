class UsersController < ApplicationController

  def oauth
    # authorizing a request: (https://dev.twitter.com/docs/auth/authorizing-request)
    oauth_consumer_key = ENV["TWITTER_CONSUMER_KEY"]
    oauth_nonce = SecureRandom.base64(32).gsub(/[^0-9a-z ]/i, '')
    # needs Post/Get, base url, parameters
    # oauth_signature = 
  end

  def application_only_requests
    Base64.encode64(ENV["TWITTER_CONSUMER_KEY"] + ":" + ENV["TWITTER_CONSUMER_SECRET"])
  end
end

# to get bearer token
#response = HTTParty.post('https://api.twitter.com/oauth2/token', :query => { 'grant_type' => 'client_credentials' }, :headers => { 'Authorization' => "Basic #{encoded}", 'Content-Type' => 'application/x-www-form-urlencoded;charset=UTF-8' } )

# basic search
# response = HTTParty.get("https://api.twitter.com/1.1/search/tweets.json", :query => { 'q' => 'bacon' }, :headers => { 'Authorization' => "Bearer #{ENV['TWITTER_BEARER_TOKEN']}" })

# find a tweet
# response = HTTParty.get("https://api.twitter.com/1.1/statuses/show.json", :query => { 'id' => 464468014386409474 }, :headers => { 'Authorization' => "Bearer #{ENV['TWITTER_BEARER_TOKEN']}" })
# id
# response["id"]
# user name
# response["user"]["name"]
# profile image
# response["user"]["profile_image_url"]
# text
# response["text"]
# included media
# response["entities"]["media"][0]["media_url"]
# 