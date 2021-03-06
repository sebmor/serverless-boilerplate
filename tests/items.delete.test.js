
// Env
process.env.region = 'eu-central-1'
process.env.tableName = 'dev-mf-sl-bp-testTable'

// Modules
const is = require('@sindresorhus/is')
const { handler } = require('../functions/items/delete')
const { createItem } = require('../functions/libs/items-lib')

// Tmp vars
let idItem

// Hooks
beforeAll(async () => {
  const item = await createItem({ itemProps: { name: 'foo', foo: 'bar' } })
  idItem = item.idItem
})

test('should send proper error response if a bad request happens', (done) => {
  const anEvent = {
    body: JSON.stringify({
      idItem: -1
    })
  }
  const context = {}

  handler(anEvent, context, (err, res) => {
    expect(err).toBeNull()
    expect(is(res)).toBe('Object')
    expect(is(res.statusCode)).toBe('number')
    expect(is(res.headers)).toBe('Object')
    expect(is(res.body)).toBe('string')
    expect(res.statusCode).toBe(400)
    expect(res.headers).toMatchObject({ 'Access-Control-Allow-Origin': '*' })

    done()
  })
})

test('should send proper response', (done) => {
  const anEvent = {
    pathParameters: {
      idItem
    }
  }
  const context = {}

  handler(anEvent, context, (err, res) => {
    expect(err).toBeNull()
    expect(is(res)).toBe('Object')
    expect(is(res.statusCode)).toBe('number')
    expect(is(res.headers)).toBe('Object')
    expect(is(res.body)).toBe('string')
    expect(res.statusCode).toBe(204)
    expect(res.headers).toMatchObject({ 'Access-Control-Allow-Origin': '*' })

    done()
  })
})

test('should send 404 response if item not found', (done) => {
  const anEvent = {
    pathParameters: {
      idItem: 'notFound'
    }
  }
  const context = {}

  handler(anEvent, context, (err, res) => {
    expect(err).toBeNull()
    expect(is(res)).toBe('Object')
    expect(is(res.statusCode)).toBe('number')
    expect(is(res.headers)).toBe('Object')
    expect(is(res.body)).toBe('string')
    expect(res.statusCode).toBe(404)
    expect(res.headers).toMatchObject({ 'Access-Control-Allow-Origin': '*' })

    done()
  })
})
