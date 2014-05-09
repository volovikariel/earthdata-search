require "spec_helper"

describe "Data access status page", reset: false do

  context "when the current user has recent data retrievals" do
    before :all do
      visit '/search'
      login
      visit '/data/status'
    end

    after :all do
      visit '/search'
      logout
    end

    it "displays a textual summary of recent orders" do
      expect(page).to have_content("15 Minute Stream Flow Data: USGS (FIFE) (39 granules)")
    end

    it "displays an indication of how long ago orders were placed" do
      expect(page).to have_content("ago")
    end

    it "indicates current order status" do
      expect(page).to have_content("Closed")
    end

    it "shows remove buttons next to items that can be removed" do
      within('tbody tr:nth-child(2)') do
        expect(page).to have_selector('a[title="remove"]')
      end
    end

    it "does not show remove buttons next to items that cannot be removed" do
      within('tbody tr:first-child') do
        expect(page).to have_no_selector('a[title="remove"]')
      end
    end

    context "clicking the remove button" do
      before :all do
        click_link "remove"
      end

      after :all do
        visit '/data/status'
      end

      it "removes the dataset from the list" do
        expect(page).to have_no_selector('tbody tr:nth-child(2)')
      end
    end
  end

  context "when the current user has no recent data retrievals" do
    before :all do
      visit '/data/status'
    end

    it "indicates that there are no recent retrievals" do
      expect(page).to have_content("No recent retrievals")
    end
  end
end
