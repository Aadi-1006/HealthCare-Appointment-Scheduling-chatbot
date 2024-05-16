# import json
# import nltk
# import numpy as np
# import random
# import string
# from sklearn.feature_extraction.text import TfidfVectorizer
# from sklearn.metrics.pairwise import cosine_similarity

# nltk.download('punkt')
# nltk.download('wordnet')

# # Load data for normal conversation
# with open('Covid Dataset.txt', 'r') as file:
#     data = json.load(file)

# # Preprocess the data, ensuring all questions are strings and filtering out any non-string entries
# questions = []
# answers = []
# for item in data:
#     if isinstance(item.get('question'), str):
#         questions.append(str(item['question']))
#     if isinstance(item.get('answer'), str):
#         answers.append(str(item['answer']))

# # Create a TfidfVectorizer for text vectorization
# vectorizer = TfidfVectorizer()
# X = vectorizer.fit_transform(questions)

# def find_answer(query):
#     query_vec = vectorizer.transform([query])
#     cosine_similarities = query_vec * X.T.tocsr()
    
#     flat_similarities = np.array(cosine_similarities.todense()).flatten()
#     best_match_index = flat_similarities.argmax()

#     if flat_similarities[best_match_index] > 0:
#         return answers[best_match_index]
#     else:
#         return 'Sorry, I could not find a relevant answer.'

# # Load data for health issue handling
# with open('symptom.txt', 'r', errors='ignore') as f:
#     raw = f.read().lower()
# with open('pincodes.txt', 'r', errors='ignore') as m:
#     rawone = m.read().lower()

# sent_tokens = nltk.sent_tokenize(raw)
# word_tokens = nltk.word_tokenize(raw)
# sent_tokensone = nltk.sent_tokenize(rawone)
# word_tokensone = nltk.word_tokenize(rawone)

# lemmer = nltk.stem.WordNetLemmatizer()
# def LemTokens(tokens):
#     return [lemmer.lemmatize(token) for token in tokens]
# remove_punct_dict = dict((ord(punct), None) for punct in string.punctuation)
# def LemNormalize(text):
#     return LemTokens(nltk.word_tokenize(text.lower().translate(remove_punct_dict)))

# GREETING_INPUTS = ("hello", "hi", "hiii", "hii", "hiiii", "hiiii", "greetings", "sup", "what's up", "hey")
# GREETING_RESPONSE = "Hello, I'm Elena, your healthcare assistant. Tell me if you want to know about your health or have a normal conversation (health/conversation)."

# Basic_Q = ("yes", "y")
# Basic_Ans = "okay, tell me about your symptoms"
# Basic_Om = ("no", "n")
# Basic_AnsM = "thank you visit again"
# fev = ("iam suffering from fever", "i affected with fever", "i have fever", "fever")
# feve_r = ("which type of fever you have? and please mention your symptoms then we try to calculate your disease.")

# def greeting(sentence):
#     for word in sentence.split():
#         if word.lower() in GREETING_INPUTS:
#             return GREETING_RESPONSE

# def basic(sentence):
#     for word in Basic_Q:
#         if sentence.lower() == word:
#             return Basic_Ans

# def fever(sentence):
#     for word in fev:
#         if sentence.lower() == word:
#             return feve_r

# def basicM(sentence):
#     for word in Basic_Om:
#         if sentence.lower() == word:
#             return Basic_AnsM

# def response(user_response):
#     robo_response = ''
#     sent_tokens.append(user_response)
#     TfidfVec = TfidfVectorizer(tokenizer=LemNormalize, stop_words='english')
#     tfidf = TfidfVec.fit_transform(sent_tokens)
#     vals = cosine_similarity(tfidf[-1], tfidf)
#     idx = vals.argsort()[0][-2]
#     flat = vals.flatten()
#     flat.sort()
#     req_tfidf = flat[-2]
#     if req_tfidf == 0:
#         robo_response = robo_response + "I am sorry! I don't understand you"
#     else:
#         robo_response = robo_response + sent_tokens[idx]
#     sent_tokens.remove(user_response)
#     return robo_response

# def responseone(user_response):
#     robo_response = ''
#     sent_tokensone.append(user_response)
#     TfidfVec = TfidfVectorizer(tokenizer=LemNormalize, stop_words='english')
#     tfidf = TfidfVec.fit_transform(sent_tokensone)
#     vals = cosine_similarity(tfidf[-1], tfidf)
#     idx = vals.argsort()[0][-2]
#     flat = vals.flatten()
#     flat.sort()
#     req_tfidf = flat[-2]
#     if req_tfidf == 0:
#         robo_response = robo_response + "I am sorry! I don't understand you"
#     else:
#         robo_response = robo_response + sent_tokensone[idx]
#     sent_tokensone.remove(user_response)
#     return robo_response

# def chat(user_response):
#     user_response = user_response.lower()
#     keyword = " module "
#     keywordone = " module"
#     keywordsecond = "module "
    
#     if user_response != 'bye':
#         if user_response in ['thanks', 'thank you', 'quit', 'exit']:
#             return "You're welcome! Have a nice day."
#         elif basicM(user_response) is not None:
#             return basicM(user_response)
#         else:
#             if keyword in user_response or keywordone in user_response or keywordsecond in user_response:
#                 return responseone(user_response)
#             elif greeting(user_response) is not None:
#                 return greeting(user_response)
#             elif "your name" in user_response:
#                 return IntroduceMe(user_response)
#             elif basic(user_response) is not None:
#                 return basic(user_response)
#             elif fever(user_response) is not None:
#                 return fever(user_response)
#             else:
#                 return response(user_response)
#     else:
#         return "Bye! Take care."

# if __name__ == '__main__':
#     print("Hello, I'm Elena, how can I assist you?")
#     while True:
#         user_input = input("You: ").lower()
#         if user_input in ["bye", "exit", "quit", "thanks", "thank you"]:
#             print("Elena: You're welcome! Have a nice day.")
#             break
#         else:
#             print("Elena: Are you having any health issues or want to have a normal conversation? (Enter 'issue' or 'conversation')")
#             choice = input("You: ").lower()
#             if choice == "conversation":
#                 print("Elena: Okay, let's have a normal conversation.")
#                 while True:
#                     user_input = input("You: ")
#                     if user_input.lower() in ["bye", "exit", "quit"]:
#                         print("Elena: Goodbye! Stay healthy!")
#                         break
#                     else:
#                         answer = find_answer(user_input)
#                         print(f"Elena: {answer}")
#             elif choice == "issue":
#                 print("Elena: Okay, let's talk about your health issue.")
#                 while True:
#                     user_input = input("You: ")
#                     if user_input.lower() in ["bye", "exit", "quit"]:
#                         print("Elena: Goodbye! Stay healthy!")
#                         break
#                     else:
#                         answer = chat(user_input)
#                         print(f"Elena: {answer}")
#             else:
#                 print("Elena: Sorry, I didn't understand that. Please enter 'issue' or 'conversation'.")