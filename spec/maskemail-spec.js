const maskEmail = require('../src/maskemail');
describe('maskEmail', () => {
	it('survives invalid inputs', () => {
		expect(maskEmail(undefined)).toEqual(undefined);
		expect(maskEmail(false)).toEqual(false);
		expect(maskEmail(null)).toEqual(null);
		expect(maskEmail('')).toEqual('');
		expect(maskEmail('not-an-email')).toEqual('not-an-email');
	});
	it('replaces everything apart from the initial letter of each block and the top-level domain with stars', () => {
		expect(maskEmail('example@test.com')).toEqual('e******@t***.com');
		expect(maskEmail('1763876238721ABCD@test.com')).toEqual('1****************@t***.com');
		expect(maskEmail('email@domain.com')).toEqual('e****@d*****.com');
		expect(maskEmail('firstname.lastname@domain.com')).toEqual('f********.l*******@d*****.com');
		expect(maskEmail('email@subdomain.domain.com')).toEqual('e****@s********.d*****.com');
		expect(maskEmail('firstname+lastname@domain.com')).toEqual('f********+l*******@d*****.com');
		expect(maskEmail('email@123.123.123.123')).toEqual('e****@1**.1**.1**.123');
		expect(maskEmail('email@[123.123.123.123]')).toEqual('e****@[***.1**.1**.123]');
		expect(maskEmail('"email"@domain.com')).toEqual('"e****"@d*****.com');
		expect(maskEmail('"email..email"@domain.com')).toEqual('"e****..e****"@d*****.com');
		expect(maskEmail('1234567890@domain.com')).toEqual('1*********@d*****.com');
		expect(maskEmail('email@domain-one.com')).toEqual('e****@d*********.com');
		expect(maskEmail('_______@domain.com')).toEqual('_******@d*****.com');
		expect(maskEmail('email@domain.name')).toEqual('e****@d*****.name');
		expect(maskEmail('email@domain.co.jp')).toEqual('e****@d*****.c*.jp');
		expect(maskEmail('firstname-lastname@domain.com')).toEqual('f*****************@d*****.com');
		expect(maskEmail('name@localhost')).toEqual('n***@localhost');
		expect(maskEmail('nathan@学生优惠.com')).toEqual('n*****@学***.com');
	});
	it('uses the replacement char provided in the second arg', () => {
		expect(maskEmail('example@test.com', {replacement: '#'})).toEqual('e######@t###.com');
	});
	it('uses the list of allowed characters provided by the third arg', () => {
		expect(maskEmail('example@test.com', {allowed: /@\.p/})).toEqual('e***pl*@t***.com');
		expect(maskEmail('firstname-lastname@domain-one.com', {allowed: /@\.-/})).toEqual('f********-l*******@d*****-o**.com');
	});
});
