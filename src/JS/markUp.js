export function createMarkup(array) {
  return array
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<a href="${largeImageURL}" class="photo-card-link">
            <div class="photo-card">
                <img src="${webformatURL}" alt="${tags}" class="photo-card-img" loading="lazy" />
                <div class="info">
                    <p class="info-item">
                        <b>Likes </b>${likes}
                    </p>
                    <p class="info-item">
                        <b>Views </b>${views}
                    </p>
                    <p class="info-item">
                        <b>Comments </b>${comments}
                    </p>
                    <p class="info-item">
                        <b>Downloads </b>${downloads}
                    </p>
                </div>
              </div>
        </a>`
    )
    .join('');
}

export function clearMarkUp(el) {
  el.innerHTML = '';
}
