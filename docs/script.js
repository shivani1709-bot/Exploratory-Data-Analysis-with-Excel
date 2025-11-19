async function loadProjects(){
  const res = await fetch('projects.json');
  const projects = await res.json();
  const grid = document.getElementById('grid');
  const search = document.getElementById('search');

  function render(filter=''){
    grid.innerHTML='';
    const q = filter.toLowerCase().trim();
    projects
      .filter(p => !q || (p.title + ' ' + (p.tags||[]).join(' ') + ' ' + (p.summary||'')).toLowerCase().includes(q))
      .sort((a,b)=> (b.year||0)-(a.year||0))
      .forEach(p => {
        const card = document.createElement('div');
        card.className = 'card';
        const title = document.createElement('h3');
        title.textContent = p.title;
        card.appendChild(title);

        const meta = document.createElement('p');
        meta.textContent = (p.year ? p.year + ' • ' : '') + (p.tags ? p.tags.join(', ') : '');
        card.appendChild(meta);

        if (p.summary){
          const sum = document.createElement('p');
          sum.textContent = p.summary;
          card.appendChild(sum);
        }

        if (p.link || p.repo){
          const link = document.createElement('a');
          link.href = p.link || (p.repo ? 'https://github.com/' + p.repo : '#');
          link.target = '_blank';
          link.rel = 'noopener';
          link.textContent = 'View';
          link.className = 'btn';
          card.appendChild(link);
        }

        if (p.tags && p.tags.length){
          const row = document.createElement('div'); row.className = 'tagrow';
          p.tags.forEach(t=>{
            const tag = document.createElement('span');
            tag.className='tag'; tag.textContent=t; row.appendChild(tag);
          });
          card.appendChild(row);
        }

        grid.appendChild(card);
      });
  }

  render();
  search.addEventListener('input', e => render(e.target.value));
}

loadProjects();
