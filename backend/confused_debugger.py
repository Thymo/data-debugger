import hnswlib
from utils import encoder

embedding_size = 384


def enrich_confused_items(confused_items, data, top_k_hits=5):
    """
    Finds the top 5 most similar neighbouring data points for each confused item using approximate nearest neighbour
    search.

    The items are compared based on a dense sentence/text embedding.
    """

    embeddings = [d['embedding'] for d in data]
    index = create_index(embeddings)
    enriched_confused_items = []
    for item in confused_items:
        similar_sentences = get_similar_sentences(item['text'], index, top_k_hits)
        similar_items = [dict(data[i['corpus_id']], similarity=i['score']) for i in similar_sentences]
        enriched_confused_items.append(similar_items)

    return enriched_confused_items


def create_index(embeddings):
    index = hnswlib.Index(space='cosine', dim=embedding_size)
    index.init_index(max_elements=len(embeddings), ef_construction=400, M=64)
    index.add_items(embeddings, list(range(len(embeddings))))
    return index


def get_similar_sentences(sentence, index, top_k_hits=10):
    query_embedding = encoder.encode(sentence)
    # Use hnswlib knn_query method to find the top k closest sentences
    corpus_ids, distances = index.knn_query(query_embedding, k=top_k_hits)
    hits = [{'corpus_id': id, 'score': 1 - score} for id, score in zip(corpus_ids[0], distances[0])]
    hits = sorted(hits, key=lambda x: x['score'], reverse=True)
    return hits[0:top_k_hits]
