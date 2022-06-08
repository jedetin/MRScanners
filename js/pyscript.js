print('███╗░░░███╗██████╗░░██████╗░█████╗░░█████╗░███╗░░██╗███╗░░██╗███████╗██████╗░░██████╗\n████╗░████║██╔══██╗██╔════╝██╔══██╗██╔══██╗████╗░██║████╗░██║██╔════╝██╔══██╗██╔════╝\n██╔████╔██║██████╔╝╚█████╗░██║░░╚═╝███████║██╔██╗██║██╔██╗██║█████╗░░██████╔╝╚█████╗░\n██║╚██╔╝██║██╔══██╗░╚═══██╗██║░░██╗██╔══██║██║╚████║██║╚████║██╔══╝░░██╔══██╗░╚═══██╗\n██║░╚═╝░██║██║░░██║██████╔╝╚█████╔╝██║░░██║██║░╚███║██║░╚███║███████╗██║░░██║██████╔╝\n╚═╝░░░░░╚═╝╚═╝░░╚═╝╚═════╝░░╚════╝░╚═╝░░╚═╝╚═╝░░╚══╝╚═╝░░╚══╝╚══════╝╚═╝░░╚═╝╚═════╝░')
print('-'*10, '\nWelcome to MRScanner Movie Recommendation Engine\n', '-'*10)
df1 = pd.read_csv('dataset.csv')
df2 = pd.read_csv('datasets-1/movies.csv')
ratings = pd.read_csv('datasets-1/ratings.csv')

df2['title'] = df2.title.str[:-7]
df3 = pd.merge(df2, df1, on='title', how='inner')

ratings = pd.read_csv('datasets-1/ratings.csv')
ratings = pd.merge(df3,ratings, on='movieId').drop(['genres','timestamp'],axis=1)

userRatings = ratings.pivot_table(index=['userId'],columns=['title'],values='rating_y')
userRatings = userRatings.dropna(thresh=10, axis=1).fillna(0,axis=1)
# userRatings.head()
corrMatrix = userRatings.corr(method='pearson')
# corrMatrix.head(10)

def cf_recommend(movie_name,rating):
    similar_ratings = corrMatrix[movie_name]*(rating-2.5)
    similar_ratings = similar_ratings.sort_values(ascending=False)
#     print(type(similar_ratings))
    return similar_ratings

data = df3[['movieId', 'title', 'description']].copy()
data.drop_duplicates(subset ="title", keep = False, inplace = True)

cv = CountVectorizer(max_features=1000,stop_words='english')
vector = cv.fit_transform(data['description']).toarray()
similarity = cosine_similarity(vector)


def cb_recommend(movie):
    indexa = data[data['title'] == movie]
    if indexa.empty:
        print("unable to recommend movies.")
    else:
        indexed = indexa.index[0]
        distances = sorted(list(enumerate(similarity[indexed])), reverse=True, key=lambda x: x[1])
        for i in distances[1:6]:
            print(data.iloc[i[0]].title)



movie_like = []
    #
x = ((input("Enter a movie you like the most!: ")), 5)
movie_like.append(x)
x = ((input("Enter a movie you just like: ")), 4)
movie_like.append(x)
x = ((input("Enter a movie you didn't like!: ")), 1)
movie_like.append(x)
    # return movie_like

def recommend_all():
    print("------------- Similar to ", movie_like[0][0], " ----------------------")
    cb_recommend(movie_like[0][0])
    print("------------- Similar to ", movie_like[1][0], "----------------------")
    cb_recommend(movie_like[1][0])

    similar_movies = pd.DataFrame()
    for movie,rating in movie_like:
        similar_movies = similar_movies.append(cf_recommend(movie,rating),ignore_index = True)
    similar_movies = similar_movies.sum().sort_values(ascending=False).head(10)
    recc_movie= similar_movies.to_frame()
    recc_movie_list = recc_movie.index.tolist()
    print("------------- Users also liked ----------------------")
    for i in recc_movie_list:
        print(i)

recommend_all()