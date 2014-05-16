class WelcomeController < ApplicationController

  def index

    if current_user
      response = HTTParty.get("https://api.twitter.com/1.1/users/show.json", :query => { 'user_id' => current_user.uid }, :headers => { 'Authorization' => "Bearer #{ENV['TWITTER_BEARER_TOKEN']}" })

      @image = response["profile_image_url"]
      @screen_name = response["screen_name"]
    end
  end

end

# def response(id)
#   request = HTTParty.get("https://api.twitter.com/1.1/statuses/show.json", :query => { 'id' => id }, :headers => { 'Authorization' => "Bearer #{ENV['TWITTER_BEARER_TOKEN']}" })
#   puts "\"id\": \"#{request['user']['id']}\","
#   puts "\"name\": \"#{request['user']['name']}\","
#   puts "\"screen_name\": \"#{request['user']['screen_name']}\","
#   puts "\"image\": \"#{request['user']['profile_image_url']}\","
#   puts "\"text\": \"#{request['text']}\","
# end

# 5*4*3*2*1

# def factorial(num)
#   if num ==1 
#     return 1
#   else
#     num * factorial(num -1)
#   end
# end

# def run_forever(hash)
#   if hash[:children]
#     hash[:children].each do |child|
#       run_forever(hash)
#     end
#   end

# end

