const demos = [
  'box',
  'demo',
  'disco',
  'force',
  'layered',
  'mrtree',
  'random',
  'stress',
];

let options = {
  "elk.hierarchyHandling": `INHERIT`,
  "elk.layered.crossingMinimization.hierarchicalSweepiness": 0.1
};

function populateDemosList(cy) {
  const el = document.getElementById('demos');
  demos.forEach((demo) => {
    const li = document.createElement('li');
    li.innerText = demo;
    el.appendChild(li);
    li.addEventListener("click", () => {
      cy.layout({
        name: 'elk',
        elk: {
          algorithm: demo,
          hierarchyHandling: document.getElementById(`Hierarchy_Handling`).value,
          'layered.crossingMinimization.hierarchicalSweepiness': Number(document.getElementById(`nodeRepulsion`).value)
        },
      }).run();
    });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  const cy = cytoscape({
    container: document.getElementById('cy'),
    layout: {
      name: 'elk',
      elk: {
        algorithm: 'mrtree',
      },
    },
    style: [
      {
        selector: 'edge',
        style: {
          'curve-style': 'bezier',
          'target-arrow-shape': 'triangle',
          'arrow-scale': 0.66,
        },
      },
      {
        selector: 'node',
        style: {
          'background-color': '#ff0000',
        },
      },
      {
        selector: 'node:parent',
        style: {
          'background-opacity': 0.1,
          'background-color': '#00ff00',
        },
      }
    ],
  });

  window.cy = cy;

  populateDemosList(cy);

  document.getElementById('load-button')
    .addEventListener('click', () => {
      document.getElementById('graphml-input').click();
    });

  document.getElementById('graphml-input')
    .addEventListener('change', function (ev) {
      const file = this.files[0];

      cy.elements().remove();
      file.text().then((s) => {
        cy.graphml({
          layoutBy: () => {
            cy.layout({
              name: 'elk',
              elk: {
                algorithm: 'layered',
              },
            }).run();
          }
        });
        cy.graphml(s);
        const nodes = cy.nodes(':childless');
        for (let i = 0; i < nodes.length; i++) {
          const r = 10 + Math.random() * 90;
          const b = 10 + Math.random() * 90;
          nodes[i].css('width', r);
          nodes[i].css('height', b);


        }

      });
    });


  cy.layout({
    name: 'elk',
    elk: {
      algorithm: 'layered',
    },
  }).run();

  // const demoMatch = /demo=([a-z]+)/.exec(location.search);
  // if (demoMatch) {
  //   const script = Object.assign(document.createElement('script'), {
  //     src: `./demo-${demoMatch[1]}.js`,
  //   });
  //   document.body.appendChild(script);
  // }

});
