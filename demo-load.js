/* document.getElementById("cy").innerHTML += '<div class="topnav"><label class="custom-file-input" for="graphml-input"><button id="load-button" class="button">Load Graphml</button></label><input id="graphml-input" type="file" accept=".graphml"></div>';

var cy = window.cy = cytoscape({
  container: document.getElementById('cy')
});


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


    });
  });


 */