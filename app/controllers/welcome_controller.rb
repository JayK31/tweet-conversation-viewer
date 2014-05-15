class WelcomeController < ApplicationController

  def index

    if current_user
      response = HTTParty.get("https://api.twitter.com/1.1/users/show.json", :query => { 'user_id' => current_user.uid }, :headers => { 'Authorization' => "Bearer #{ENV['TWITTER_BEARER_TOKEN']}" })

      @image = response["profile_image_url"]
      @screen_name = response["screen_name"]
    end
  end

end