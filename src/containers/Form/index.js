// == Import : npm
import { connect } from 'react-redux';

// == Import : local
import Form from 'src/components/Form';

// Action Creators
import { inputChanged, formSubmitted } from 'src/store/reducer';

/* === State (données) ===
 * - mapStateToProps retroune un objet de props pour le composant de présentation
 * - mapStateToProps met à dispo 2 params
 *  - state : le state du store (getState)
 *  - ownProps : les props passées au container
 * Pas de data à transmettre ? const mapStateToProps = null;
 */
const mapStateToProps = (state, ownProps) => ({
  search: state.search,
});

/* === Actions ===
 * - mapDispatchToProps retroune un objet de props pour le composant de présentation
 * - mapDispatchToProps met à dispo 2 params
 *  - dispatch : la fonction du store pour dispatcher une action
 *  - ownProps : les props passées au container
 * Pas de disptach à transmettre ? const mapDispatchToProps = {};
 */
const mapDispatchToProps = (dispatch, ownProps) => ({
  inputModified: (name, value) => {
    const action = inputChanged(name, value);
    dispatch(action);
  },

  searchDone: () => {
    const action = formSubmitted();
    dispatch(action);
  }
});

// Container
const FormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form);

// == Export
export default FormContainer;
