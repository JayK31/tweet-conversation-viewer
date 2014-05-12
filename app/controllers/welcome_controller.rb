class WelcomeController < ApplicationController

  def index
    images = ["phil.png", "jon.jpg"]
    @image = images.sample
  end

end