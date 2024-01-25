https://next-auth.js.org/getting-started/example

https://next-auth.js.org/providers/github

公式ドキュメントわからんすぎ
しかも pages ルーター前提？

---

https://qiita.com/y_inoue15/items/d6942cd6e71ff3169822

> // 注意: トークンをログ出力してはダメです。
> console.log('in jwt', {user, token, account, profile})

なら console.log もコメントアウトしとけよ！

> →callback URL がないと This GitHub App must be configured with a callback URL エラーが出るので追加必要。Homepage URL と同じでも問題ない）

---

pages の実装いじってたら dev server 落ちた orz

https://next-auth.js.org/warnings#debug_enabled

Sign in ボタンを押すと 404 エラー
app 配下の route.ts と勘違いして pages にあった残骸をいじってた orz
それでも 404 エラー

route.ts を置く場所を間違ってた orz
api を app 配下じゃなくて root に置いてた orz

---

なんやかんやうまくいった
sign in クリックするとログインモーダルが出てきたの感動した

---

https://ui.shadcn.com/docs/components/button

インストールの仕組みの良さが全くわからん
インストール
