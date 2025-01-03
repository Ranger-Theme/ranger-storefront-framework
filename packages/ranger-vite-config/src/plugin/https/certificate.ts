import forge from 'node-forge'

const toPositiveHex = (hexString: string) => {
  let mostSignificativeHexAsInt = parseInt(hexString[0], 16)

  if (mostSignificativeHexAsInt < 8) {
    return hexString
  }

  mostSignificativeHexAsInt -= 8
  return mostSignificativeHexAsInt.toString() + hexString.substring(1)
}

export const createCertificate = (name: string = 'example.org', domains?: string[]): string => {
  const days: number = 30
  const keySize: number = 2048
  const appendDomains = domains ? domains.map((item) => ({ type: 2, value: item })) : []

  const extensions: any[] = [
    {
      name: 'keyUsage',
      keyCertSign: true,
      digitalSignature: true,
      nonRepudiation: true,
      keyEncipherment: true,
      dataEncipherment: true
    },
    {
      name: 'extKeyUsage',
      serverAuth: true,
      clientAuth: true,
      codeSigning: true,
      timeStamping: true
    },
    {
      name: 'subjectAltName',
      altNames: [
        {
          // type 2 is DNS
          type: 2,
          value: 'localhost'
        },
        {
          type: 2,
          value: 'localhost.localdomain'
        },
        {
          type: 2,
          value: 'lvh.me'
        },
        {
          type: 2,
          value: '*.lvh.me'
        },
        {
          type: 2,
          value: '[::1]'
        },
        {
          // type 7 is IP
          type: 7,
          ip: '127.0.0.1'
        },
        {
          type: 7,
          ip: 'fe80::1'
        },
        ...appendDomains
      ]
    }
  ]

  const attrs = [
    {
      name: 'commonName',
      value: name
    },
    {
      name: 'countryName',
      value: 'US'
    },
    {
      shortName: 'ST',
      value: 'Virginia'
    },
    {
      name: 'localityName',
      value: 'Blacksburg'
    },
    {
      name: 'organizationName',
      value: 'Test'
    },
    {
      shortName: 'OU',
      value: 'Test'
    }
  ]

  const keyPair = forge.pki.rsa.generateKeyPair(keySize)
  const cert = forge.pki.createCertificate()

  cert.serialNumber = toPositiveHex(forge.util.bytesToHex(forge.random.getBytesSync(9))) // the serial number can be decimal or hex (if preceded by 0x)
  cert.validity.notBefore = new Date()
  cert.validity.notAfter = new Date()
  cert.validity.notAfter.setDate(cert.validity.notBefore.getDate() + days)

  cert.setSubject(attrs)
  cert.setIssuer(attrs)

  cert.publicKey = keyPair.publicKey

  cert.setExtensions(extensions)

  const algorithm = forge.md.sha256.create()
  cert.sign(keyPair.privateKey, algorithm)

  const privateKeyPem = forge.pki.privateKeyToPem(keyPair.privateKey)
  const certPem = forge.pki.certificateToPem(cert)

  return privateKeyPem + certPem
}
