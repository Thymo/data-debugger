import json
from sentence_transformers import SentenceTransformer, util

encoder = SentenceTransformer('paraphrase-MiniLM-L6-v2')


async def seed_database(db, path='./seed/chatbot_intent_classifier_data.json'):
    """
    Seed database with local dataset provided in path
    """

    count = await db.data.count_documents({})
    if count > 0:
        return None
    print('Seeding database...')
    data = load_data(path)
    data = parse_data(data)
    data = embed_data(data)

    result = await db.data.insert_many(data)
    print('Seeding database completed!')

    return result


def load_data(path):
    with open(path) as file:
        data = json.load(file)
    return data


def parse_data(data):
    def transform(item):
        """Decode nested data property"""
        d = json.loads(item['data'])
        item['text'] = d['text']
        item['intent'] = d['intent']
        return item

    data = [transform(item) for item in data]
    return data


def embed_data(data):
    """
    Embed the sentences/text using the MiniLM language model (which uses mean pooling)
    """

    print('Embedding data')
    sentences = [i['text'] for i in data]
    embeddings = encoder.encode(sentences)
    data = [dict(item, embedding=embedding.tolist()) for item, embedding in zip(data, embeddings)]
    return data
