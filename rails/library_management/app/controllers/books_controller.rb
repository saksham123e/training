class BooksController < ApplicationController
  def index
    if params[:search]
      @books = Book.where("title LIKE ?", "%#{params[:search]}%").page(params[:page]).per(5)
    else
      @books = Book.all.page(params[:page]).per(5)
    end
  end

  def show
    @book = Book.find(params[:id])
  end

  def new
    @book = Book.new
  end

  def create
    @book = Book.new(book_params)
    @book.available = true

    if @book.save
      redirect_to books_path
    else
      render :new
    end
  end

  def edit
    @book = Book.find(params[:id])
  end

  def update
    @book = Book.find(params[:id])

    if @book.update(book_params)
      redirect_to books_path
    else
      render :edit
    end
  end

  def destroy
    @book = Book.find(params[:id])
    @book.destroy

    respond_to do |format|
      format.html { redirect_to books_path }
      format.turbo_stream
    end
  end

  private

  def book_params
    params.require(:book).permit(:title, :author, :genre, :price)
  end
end
