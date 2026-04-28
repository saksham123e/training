class IssuesController < ApplicationController

  def index
    @issues = Issue.all
  end

  def new
    @issue = Issue.new
    @users = User.all
    @books = Book.where(available: true)
  end

  def create
    @issue = Issue.new(issue_params)
    @issue.issue_date = Date.today

    if @issue.book.available
      @issue.save
      @issue.book.update(available: false)
      redirect_to issues_path
    else
      render plain: "Book not available"
    end
  end

  def return_book
    @issue = Issue.find(params[:id])
    @issue.update(return_date: Date.today)
    @issue.book.update(available: true)

    redirect_to issues_path
  end

  private

  def issue_params
    params.require(:issue).permit(:user_id, :book_id)
  end
end