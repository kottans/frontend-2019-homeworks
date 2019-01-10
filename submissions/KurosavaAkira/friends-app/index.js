import RenderFiltersContainer from './components/Filters.js';
import RenderFriendsList from './components/Friends.js';
import { createFriendsList } from './components/Data.js';

(async () => {
    await createFriendsList();
    RenderFiltersContainer();
    RenderFriendsList();
})();