from collections import Counter

from sentence_transformers import util


def get_confused_clusters(data, threshold=0.85):
    """
    Finds clusters of similar data points but with different labels.

    Clustering is done using fast community clustering algorithm.

    The items are compared based on a dense sentence/text embedding.
    """

    embeddings = [d['embedding'] for d in data]
    clusters = util.community_detection(embeddings, min_community_size=2, threshold=threshold)
    out = []
    for i, cluster_ids in enumerate(clusters):
        cluster = [data[idx] for idx in cluster_ids]
        labels = [d['intent'] for d in cluster]
        label_counter = Counter(labels)
        if len(label_counter) < 2:
            continue
        majority_label = label_counter.most_common(1)[0][0]
        out.append([dict(d, minority_label=majority_label != d['intent']) for d in cluster])

    return out
