/**
 * 5年社会科「自動車づくりにはげむ人々」学習サイト
 * GAS Web App ルーティング
 */

function doGet(e) {
  const page = (e && e.parameter && e.parameter.page) || 'index';
  const allowed = ['index', 'koutei', 'hito', 'buhin', 'sekai', 'kankyo', 'matome'];
  const name = allowed.indexOf(page) >= 0 ? page : 'index';

  return HtmlService.createTemplateFromFile(name)
    .evaluate()
    .setTitle('自動車づくりにはげむ人々 ｜ 5年社会科 学習サイト')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/** HTMLファイルをインクルードするヘルパー（CSS・JS用） */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/** WebアプリのURLを取得（ナビゲーション用） */
function getUrl() {
  return ScriptApp.getService().getUrl();
}
