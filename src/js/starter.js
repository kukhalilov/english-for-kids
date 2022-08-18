const root = document.getElementById('root');
root.className = 'container-fluid d-flex flex-column min-vh-100';
root.innerHTML = `<nav id="nav" class="nav fixed-top d-flex">
      <div id="nav-icon-wrapper"><a id="nav-icon" class="btn btn-primary z-index-1052" role="button"
          aria-controls="offcanvasExample">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </a></div>
      <h1 id="main-heading">ENGLISH FOR KIDS</h1>
      <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked">
        <label class="form-check-label h2 text-white" for="flexSwitchCheckChecked">TRAIN</label>
      </div>
    </nav>
    <div id="sidebar" class="sidebar">
      <div>
        <ul class="nav justify-content-center align-items-center flex-column">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#"><i class="fa-solid fa-house"></i>
              &nbsp;<span>Home</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#"><i class="fa-solid fa-compass-drafting"></i> &nbsp;<span>Action (set A)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#"><i class="fa-solid fa-person-swimming"></i> &nbsp;<span>Action (set B)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#"><i class="fa-solid fa-cat"></i> &nbsp;<span>Animal (set A)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#"><i class="fa-solid fa-dog"></i> &nbsp;<span>Animal (set B)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#"><i class="fa-solid fa-shirt"></i> &nbsp;<span>Clothes</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#"><i class="fa-solid fa-face-grin-wide"></i>
              &nbsp;<span>Emotions</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#"><i class="fa-solid fa-flag"></i> &nbsp;<span>Countries</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#"><i class="fa-solid fa-car"></i>
              &nbsp;<span>Transportation</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#"><i class="fa-solid fa-chart-line"></i>
              &nbsp;<span>Statistics</span></a>
          </li>
        </ul>
      </div>
    </div>
    <div id="home" class="cards home show">
      <div id="cards"
        class="mb-4 container d-flex flex-wrap justify-content-center align-items-center gap-4 text-center"></div>
    </div>
    <div id="statistics" class="cards text-center">
      <div class="stat-header header">
        <h2 class="display-4">Statistics</h2>
        <button class="btn btn-danger" type="button" data-bs-toggle="modal"
          data-bs-target="#reset-modal">Reset</button>
        <button class="btn btn-info repeat">Repeat difficult words</button>
      </div>
      <div class="statistics mb-4 container d-flex justify-content-center align-items-center">
        <div class="table-responsive">
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th><div class="th">Word <div class="sort"><i class="fa-solid fa-sort-up"></i><i class="fa-solid fa-sort-down"></i></div></div></th>
                <th><div class="th">Translation <div class="sort"><i class="fa-solid fa-sort-up"></i><i class="fa-solid fa-sort-down"></i></div></div></th>
                <th><div class="th">Category <div class="sort"><i class="fa-solid fa-sort-up"></i><i class="fa-solid fa-sort-down"></i></div></div></th>
                <th><div class="th">Clicks <div class="sort"><i class="fa-solid fa-sort-up"></i><i class="fa-solid fa-sort-down"></i></div></div></th>
                <th><div class="th">Correct <div class="sort"><i class="fa-solid fa-sort-up"></i><i class="fa-solid fa-sort-down"></i></div></div></th>
                <th><div class="th">Incorrect <div class="sort"><i class="fa-solid fa-sort-up"></i><i class="fa-solid fa-sort-down"></i></div></div></th>
                <th><div class="th">% correct <div class="sort"><i class="fa-solid fa-sort-up"></i><i class="fa-solid fa-sort-down"></i></div></div></th>
              </tr>
            </thead>
            <tbody id="table-body" class="unordered">
            </tbody>
          </table>
        </div>
      </div>
      <div id="reset-modal" class="modal fade" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h2 class="modal-title">Reset</h2>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <h5>Are you sure to reset all of the statistics?</h5>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger reset" data-bs-dismiss="modal">Reset</button>
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="sidebar-backdrop"></div>
    <div id="repeat" class="mb-4 container d-flex flex-column justify-content-center align-items-center">
      <h2 class="display-4 text-center">Repeat difficult words</h2>
      <div class="mb-4 container d-flex flex-wrap justify-content-center align-items-center gap-4 text-center"><h3>There are no difficult words</h3></div>
    </div>`;
