import asyncio

import tornado.web
import tornado.ioloop
import requests
import json

class MainHandler(tornado.web.RequestHandler):
    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "x-requested-with")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')

    def post(self):
        requestBody = self.request.body
        body = json.loads(requestBody)
        securityName = body.get("securityName")
        exchangeCode = body.get("exchangeCode")
        requestJson = {"query": securityName, "exchCode": exchangeCode}
        r = requests.post('http://api.openfigi.com/v3/search', json=requestJson)
        self.finish(r.json())

    def options(self, *args):
        # no body
        # `*args` is for route with `path arguments` supports
        self.set_status(204)
        self.finish()

def make_app():
    return tornado.web.Application([
        (r"/search", MainHandler),
    ])

async def main():
    print("listening on port 8888")
    app = make_app()
    app.listen(8888)
    await asyncio.Event().wait()

if __name__ == "__main__":
    asyncio.run(main())