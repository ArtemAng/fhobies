import {
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Posts from './pages/Posts';
import Profile from './pages/Profile';
import CollectionItems from './pages/CollectionItems';
import Admin from './pages/Admin';
// export const useRoutes = (isAutentificated) => {
//     if (isAutentificated)
//         return (
//             <Switch>
//                 <Route path='/profile' >
//                     <Profile />
//                 </Route>

//                 <Route path='/SignIn' >
//                     <Redirect to='/' />
//                 </Route>
//                 <Route path='/SignUp'>
//                     <Redirect to='/' />
//                 </Route>
//                 <Route path='/'>
//                     <Posts />
//                 </Route>
//             </Switch>
//         )
//     else return (
//         <Switch>
//             <Route path='/SignIn' >
//                 <SignIn />
//             </Route>
//             <Route path='/SignUp'>
//                 <SignUp />
//             </Route>
//             <Route path='/profile' >
//                 <Redirect to='/SignIn' />

//             </Route>
//             <Route path='/' >
//                 <Redirect to='/SignIn' />
//             </Route>
//         </Switch>
//     )
// }
export const useRoutes = (isAutentificated, openDrawer, isAdmin, openDrawerHandle) => {
    if (isAutentificated)
        return (
            <Switch>
                <Route path='/collectionitems' component={CollectionItems} />
                <Route path='/profile' component={Profile} />
                <Route path='/admin'  >
                    <Admin open={openDrawer} openDrawerHandle={openDrawerHandle} />
                </Route>
                <Route path='/SignIn' >
                    <Redirect to='/' />
                </Route>
                <Route path='/SignUp'>
                    <Redirect to='/' />
                </Route>
                <Route path='/' component={Posts} />
            </Switch>
        );
    if (!isAutentificated) {
        return (
            <Switch>
                <Route path='/collectionitems' component={CollectionItems} />
                <Route path='/admin'  >
                    <Admin open={openDrawer}/>
                </Route>
                <Route path='/profile' component={Profile} />
                <Route path='/SignIn' >
                    <SignIn />
                </Route>
                <Route path='/SignUp'>
                    <SignUp />
                </Route>
                <Route path='/' >
                    <Redirect to='/SignIn' />
                </Route>


            </Switch>
        )
    }
}