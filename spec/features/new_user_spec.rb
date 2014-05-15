require 'spec_helper'

describe 'the site' do
  describe 'a new user visits the homepage' do
    it 'displays a giant rat' do
      #browser goes to rat
      visit("/")
      expect( page ).to have_content 'Sign in with Twitter'
    end
  end

  #   it 'displays a giant rat' do
  #     visit root_path
  #     #temporary copy of page
  #     save_and_open_page
  #     expect( page.has_css?('img[alt="giant rat"]') ).to be_true
  #   end
  # end

  #   it 'has a sign-up link' do
  #     visit root_path
  #     click_link 'Sign Up'
  #     expect(page).to have_content 'Please enter your name'
  #     expect(current_path).to eq '/users/new'
  #   end

  #   describe "creating a user" do
  #     # Given I've entered the correct info
  #     # When I click on sign up
  #     # Then I should go to the homepage
  #     # And I should see "thanks for signing up"
  #     describe 'signing up with valid credentials' do
  #       let(:user) {FactoryGirl.build(:user)}

  #       it 'takes us to the homepage and says thanks for signing up' do
  #         sign_up(user)
  #         expect(current_path).to eq root_path
  #         expect(page).to have_content 'Thanks for signing up!'
  #       end
  #     end

  #     describe 'doesn't let you sign up without email' do
  #       let(:user) {FactoryGirl.build(:invalid_user)}
  #       it 'doesn't let you sign up' do
  #         sign_up(user)
  #         expect(current_path).to eq new_user_path
  #         expect(page).to have_content 'Please enter an email.'
  #       end
  #     end
  #   end

end